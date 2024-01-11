const log4js = require('log4js');
const errorLog = log4js.getLogger("error");
const traceLog = log4js.getLogger("trace");

const { NomorSurat, JenisND, JenisSurat, KlasifikasiSurat, UnitSub} = require('../models/nadineModels')
const { jsonFormat } = require('../utils/jsonFormat');
const { isNull } = require('../utils/isNull');

exports.index = (req, res, next) => {
    NomorSurat.findAll({offset: 5, limit: 5,})
        .then(list => {
            jsonFormat(res, 200, "Data Nomor Surat", list)
            traceLog.trace(`User action FindAll ${list}`);
        }).catch(err => {
            console.log(err)
            errorLog.error(`at function Paket(destroy) => ${err}`);
            next(err);
        });
}

exports.gen_nosurat = async(req, res, next) => {
    //* Declare variable
    const aplikasi       = req.body.aplikasi;
    const sifat_surat    = req.body.sifat_surat;
    const id_surat       = req.body.id_surat;
    const id_jenis_nd    = req.body.id_jenis_nd;
    const id_jenis_surat = req.body.id_jenis_surat;
    const perihal        = req.body.perihal;
    const id_klasifikasi = req.body.id_klasifikasi;
    const id_sub_unit    = req.body.id_sub_unit;
    const id_user        = req.body.id_user;
    const nama_pembuat   = req.body.nama_pembuat;
    const tanggal        = req.body.tanggal !== null ? req.body.tanggal  : "";

    //* Set up the time
    var currentDate = new Date(tanggal);
    var thn         = currentDate.getFullYear();
    var bln         = currentDate.getMonth() + 1;
    var hr          = currentDate.getDate();
    var hours       = new Date().getHours();
    var minutes     = new Date().getMinutes();
    var seconds     = new Date().getSeconds();
    var jam         = hours + ':' + minutes + ':' + seconds;

    try{
        //* Check Number
        const checkNosur = await NomorSurat.findAll({ where: {
                                aplikasi      : aplikasi,
                                sifat_surat   : sifat_surat,
                                id_surat      : id_surat,
                                id_jenis_nd   : id_jenis_nd,
                                id_jenis_surat: id_jenis_surat,
                                id_klasifikasi: id_klasifikasi,
                                id_sub_unit   : id_sub_unit,
                                hari_nomor    : hr,
                                bulan_nomor   : bln,
                                tahun_nomor   : thn
                            }, attributes: ['id_nomor', ['nomor_jadi', 'nomor']]})
        if(!isNull(checkNosur)){
            return jsonFormat(res, 200, "The Number is Already Created", checkNosur)
        }

        //* Count Number
        const countNosur = await NomorSurat.count({where: {id_jenis_nd: id_jenis_nd, id_sub_unit: id_sub_unit, tahun_nomor: thn}})
        const Nosur      = (countNosur == 0) ? 1 : countNosur + 1

        //* Get Data for Number
        const dataND          = await JenisND.findOne({where: {id_jenis_nd: id_jenis_nd}})
        const dataJenis       = await JenisSurat.findOne({where: {id_jenis_surat: id_jenis_surat}})
        const dataKlasifikasi = await KlasifikasiSurat.findOne({where: {id_klasifikasi_surat: id_klasifikasi}})
        const dataUnit        = await UnitSub.findOne({where: {id_unit_sub: id_sub_unit}})

        //* Generate Number
        const kodeKlasifikasi = dataKlasifikasi.kode_a + dataKlasifikasi.kode_b + dataKlasifikasi.kode_c
        const GeneratedNumber = dataJenis.nama_jenis_surat == 'keputusan' || dataJenis.nama_jenis_surat == 'keputusan_tuweb' || dataJenis.nama_jenis_surat == 'peraturan'
                                ? Nosur + ' TAHUN ' + thn
                                : sifat_surat + '/' + Nosur + '/' + dataUnit.kode_unit_kerja + '/' + kodeKlasifikasi + '/' + thn

        //* Insert Data
        const store = await NomorSurat.create({
                                                aplikasi,
                                                nomor_jadi: GeneratedNumber,
                                                seq_nomor: Nosur,
                                                nomor: Nosur,
                                                sifat_surat,
                                                id_surat,
                                                id_jenis_nd,
                                                nama_jenis_nd: dataND.nama_jenis_nd,
                                                id_jenis_surat,
                                                nama_jenis_surat: dataJenis.nama_jenis_surat,
                                                perihal,
                                                tanggal_nomor: hr + bln + thn,
                                                id_klasifikasi,
                                                kode_klasifikasi: kodeKlasifikasi,
                                                nama_klasifikasi: dataKlasifikasi.rincian,
                                                id_sub_unit,
                                                kode_unit: dataUnit.kode_unit_kerja,
                                                nama_unit: dataUnit.nama_unit,
                                                id_user,
                                                nama_pembuat,
                                                jam_nomor: jam,
                                                hari_nomor: hr,
                                                bulan_nomor: bln,
                                                tahun_nomor: thn,
                                            })
        if(!store){
            return jsonFormat(res, "", "Failed", store)
        }else{
            traceLog.trace(`[Generate Number] ip : ${req.ip},id : ${req.userId}, email : ${req.email}, data : `, store.get())
            return jsonFormat(res, 201, "The Number is Successfully Created", GeneratedNumber)
        }
    }catch(err){
        console.log(err)
        errorLog.error(`at function nadineController(gen_nosurat) => ${err}`);
        next(err);
    }
}