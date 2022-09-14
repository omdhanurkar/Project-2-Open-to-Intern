const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");


const isValid = function (value) {
    if (typeof value == "String" && value.trim().length === 0) return false;
    if (typeof value === "undefined" || value === null) return false;
    return true;
};

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter data" });
        }

        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, message: "Please enter a valid name" });
        }

        if (!/^[a-zA-Z]+$/i.test(data.name)) {
            return res.status(400).send({ status: false, message: "Name should be in Alphabetic" });
        }


        if (!isValid(data.fullName)) {
            return res.status(400).send({ status: false, message: "Please enter a Full name" });
        }

        if (!/^[a-zA-Z ,]+$/i.test(data.fullName)) {
            return res.status(400).send({ status: false, message: "Full name should be in Alphabetic" });
        }

        if (!isValid(data.logoLink)) {
            return res.status(400).send({ status: false, message: "Please enter logo link" });
        }

        if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logoLink)) {
            return res.status(400).send({ status: false, message: "Please enter valid url" });
        }

        if (!data.isDeleted) {
            if (typeof data.isDeleted == Boolean) {
                return res.status(400).send({ status: false, message: "Please a boolean value only" });
            }
        }

        const checkusedName = await collegeModel.findOne({ name: data.name });
        if (checkusedName) {
            return res.status(400).send({ status: false, message: "Name already used" });
        }

        let collegeData = await collegeModel.create(data);
        return res.status(201).send({ status: true, message: "College data is successfully created", data: collegeData });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { createCollege }