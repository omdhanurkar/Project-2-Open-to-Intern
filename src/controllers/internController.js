const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");



//=================================================create interns====================================================================

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        const { name, email, mobile, collegeId } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter data to create intern" });
        }
        if (!name) return res.status(400).send({ status: false, message: "name should not be empty" });

        if (!/^[a-zA-Z ]+$/i.test(name)) {
            return res.status(400).send({ status: false, message: "Name should be in Alphabetic" });
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Email should be present" });
        }
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: "Email should be valid" });

        }
        const usedEmail = await internModel.findOne({ email });
        if (usedEmail) return res.status(400).send({ status: false, message: "eamil is already used" });

        if (!mobile) {
            console.log(mobile);
            return res.status(400).send({ status: false, message: "Mobile should be present" });
        }
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, message: "Mobile should be valid" });
        }
        const usedMobile = await internModel.findOne({ mobile });
        if (usedMobile) return res.status(400).send({ status: false, message: "Mobile is already used" });


        const college = await collegeModel.findById({ _id: collegeId })
        if (!college) return res.status(400).send({ status: false, message: "college not found" });

        const allInternData = { name, email, mobile, collegeId, college }

        const intern = await internModel.create(allInternData)
        return res.status(201).send({ status: false, message: "Intern has been created", data: intern })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }

}

module.exports = { createIntern }
