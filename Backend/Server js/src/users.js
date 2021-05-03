let aws_keys = {
    s3: {
        region: 'us-east-2',
        accessKeyId: "--",
        secretAccessKey: "-/-",
        //apiVersion: '2006-03-01',
    },
    db_credentials: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "admin",
        database: "proyecto2"
    },
    rekognition: {
        region: 'us-east-2',
        accessKeyId: "-",
        secretAccessKey: "/-" 
    },
    translate: {
        region: 'us-east-2',
        accessKeyId: "-",
        secretAccessKey: "-" 
    }
}
module.exports = aws_keys;
