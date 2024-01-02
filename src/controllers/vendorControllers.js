const { response } = require('express');
const Vendor = require('../models/vendorModels');
const { jsonFormat } = require('../utils/jsonFormat')

exports.index = (req, res, next) => {
    Vendor.findAll({})
        .then(list => {
            // res.json({
            //     status: "success",
            //     message: "list vendor",
            //     data: list
            // });
            jsonFormat(res, 200, list)
        }).catch(err => {
            console.log(err)
        });
}

exports.store = async(req, res, next) => {
    const nama = req.body.nama;

    try{
        const response = await Vendor.create({
            nama: nama
        });

        if(!response){
            res.json({
                status: "failed",
                message: "Gagal Menambahkan Data"
            });
        }

        res.json({
            status: "success",
            message: "Berhasil Menambah Data"
        });
    }catch(err){
        console.log(err)
    }
}

exports.show = (req, res, next) => {
    const id = req.params.id;

    Vendor.findOne({where: {id: id}})
        .then(resOneVendor => {
            if(!resOneVendor){
                res.json({
                    status: "failed",
                    message: "Gagal Menampilkan Data dengan id " + id
                });
            }

            res.json({
                status: "success",
                message: "Berhasil Menampilkan Data dengan id " + id,
                data : resOneVendor
            });
        }).catch(err => {            
            console.log(err)
        })
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const nama = req.body.nama;

    Vendor.update({
        nama: nama},{
        where: {
            id: id
        }
    }).then(response => {
        if(!response){
            res.json({
                status: "failed",
                message: "Gagal Mengubah Data dengan id " + id
            });
        }

        res.json({
            status: "success",
            message: "Berhasil Mengubah Data dengan id " + id,
            data : nama
        });
    }).catch(err => {
        console.log(err)
    })
}

exports.destroy = (req, res, next) => {
    const id = req.params.id;

    Vendor.findOne({where: {id: id}})
        .then(response => {
            if(!response){
                res.json({
                    status: "failed",
                    message: "Tidak menemukan Data dengan id " + id
                });
            }
            
            return Vendor.destroy({where: {id: id}})
        }).then(responseDel => {
            if(!responseDel){
                res.json({
                    status: "failed",
                    message: "Gagal Menghapus Data dengan id " + id
                });
            }

            res.json({
                status: "success",
                message: "Berhasil Menghapus Data dengan id " + id
            });
        }).catch(err => {
            console.log(err)
        })
}