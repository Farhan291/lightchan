import Thread from "../models/thread.schema.js"
const adminverify = async (req ,res) =>{
    const key = process.env.secretkey
    const adminkey = req.body.key
    console.log(adminkey)
    if(key !== adminkey){
        res.status(403).send("you are not admin")

    }
    await Thread.deleteOne({_id: req.body.thread_id})
    res.status(200).send(" thread deleted")
}

export default  adminverify