const {MongClient, ObjectId, MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017'
const DATABASE_NAME = "GCH0805-ApplicationDev"

async function getDB(){
    const client = await MongoClient.connect(url)
    const dbo = client.db(DATABASE_NAME)
    return dbo;
}

async function insertObject(collectionName, objectToInsert){
    const dbo = await getDB();
    const newO = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log ("Gia tri id moi duoc insert la: ",newO.insertedId.toHexString());

}
async function getAllUser() {
    const dbo = await getDB();
    const allUser = await dbo.collection("Users").find({}).toArray();
    return allUser;
}

async function CheckUserRole(NameI, PassI) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({userName:NameI, password:PassI});
    if (user == null){
        return "-1";
    }else{
        return user.role;
    }
    
}

module.exports = {insertObject, getAllUser, CheckUserRole}