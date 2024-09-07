const {models} = require('../database/sequelize');
const sendEmail = require('../helpers/send-email');
const nodemailer = require('nodemailer');

module.exports = {
    createSkulls,
    getAllSkulls,
    getSkullById,
    //approveSkull
}


async function createSkulls(params){
    console.log('Create Skull', params);
    const validateSkullUser = await validateSkullUserF(params);
    if(validateSkullUser === 'Create'){
        console.log('Crea')
        let skull;
        skull = await models.Skull.create(
            {
                skullTitle: params.skullTitle,
                idUser: params.idUser,
                skullText: params.skullText,
                skullImageRoute: params.skullImageRoute,
                skullStatus: 0,
            }
        )
        //enviarCorreo(params)
        return skull
    }
    else {
        console.log('Error Duplicate')
        return 'Duplicate'
    }
}

async function validateSkullUserF(params){
    const findSkull = await models.Skull.findOne(
        {
            where: {
                idUser: params.idUser
            }
        }
    )
    if (!findSkull){
        return 'Create'
    }
    else {
        return 'Duplicate'
    }
}

async function getAllSkulls(){
    console.log('Si llega a getAllSkulls')
    const skullsList = await models.Skull.findAll(
            {  
                include: 'SkullCount',
                where: { skullStatus: 1 }
            }
        );
    for (const skull of skullsList) {
        const totalUsersSkulls = await models.UserSkull.count({
            where: { idSkull: skull.idSkull },
        });
        skull.dataValues.totalUsersSkulls = totalUsersSkulls; // Agrega el total al objeto Skull
    }
    return skullsList;
}

async function getSkullById(params) {
    console.log('Si llega a getSkullById', params);
    const findSkull = await models.Skull.findOne(
        {
            where:{
                idSkull: params
            } 
        }
    )
    if(findSkull){
        return findSkull
    }
    else{
        return 'Skull not found'
    }
}
async function enviarCorreo(params) {
    console.log('enviarCorreo')
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Utiliza el servicio de Gmail
        auth: {
            user: 'promociones@rappicard.mx', // Tu dirección de correo de Gmail
            pass: 'lskx zewz fulk kelt', // Contraseña de la cuenta de Gmail
        },
    });

    const mailOptions = {
        from:'promociones@rappicard.mx',
        to: 'victor.martinez@99degrees.tech',
        subject: '¡Tu cardlaverita ya está publicada!',
        html: `<p> <h1>¡Felicidades!</h1> 
                <br>Tu cardlaverita fue aprobada, ¡ya está publicada en el sitio! Visítala ahora y compártela
                con tus amigos, familiares o con quieras. <br>
                Las más votadas, se llevarán una increíble sorpresa.<br>
                <img src="https://cardlaveritas-rappicard.mx/assets/images/promo.png" alt="" style="width: 20%;"> <br>
                El ganador será anunciado el día 3 de noviembre. Gracias por participar con tu
                cardlaverita, genio.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}