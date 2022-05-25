const animals = require('random-animals-api'); 

/***
 * - Para ejecutar de forma local el programa:
 *    Se debe crear archivo de configuracion ".env" con las variables de entorno
 *     INTENT=14023 Permisos para el bot https://ziad87.net/intents/ (elige Bot Mulproposito)
 *     TOKEN= Token de la APP CREADA https://discord.com/developers/applications/ (reset token)
 * - Para ejecutar en un servidor remoto replit.com:
 *    Se debe hacer click en Secret(icono candado) y crear las misma variables de entorno
***/
//require('dotenv').config({ path: './.env' });
require("dotenv").config();

/***
 * Se utiliza para llamar a end-point rest
 ***/
//const fetch = require('node-fetch');
const fetchPromise = import("node-fetch").then((mod) => mod.default);
const fetch = (...args) => fetchPromise.then((fetch) => fetch(...args));

/***
 * Dependencias de la libreria Discord.js v13
 ***/
const { Client, Intents, MessageEmbed } = require("discord.js");

//////////////////////////MONITOR///////////////////////////

/***
 * Logica para mantener el bot en linea, desde servidor replit.com
 ***/
const keepAlive = require("./server");
const Monitor = require("ping-monitor");

keepAlive();
const monitor = new Monitor({
    //Este valor es del end-point expueto por el proyecto TesterBootItAlive
    //Tambien debe subirse al replit.com
    website: "https://TesterBotItAlive.gustavochavez2.repl.co",
    title: "Secundario",
    interval: 15, // minutes
});

monitor.on("up", (res) => console.log(`${res.website} está encedido.`));
monitor.on("down", (res) =>
    console.log(`${res.website} se ha caído - ${res.statusMessage}`)
);
monitor.on("stop", (website) => console.log(`${website} se ha parado.`));
monitor.on("error", (error) => console.log(error));

//////////////////////////BOT REAL//////////////////////

//Configuracion tipo de acciones permitidas para el bot
const valorIntent = process.env["INTENT"];
console.log(valorIntent);

const intents = new Intents(valorIntent);
const client = new Client({ intents });

//Configuracion del token que se utiliza para el bot
const token = process.env["TOKEN"];
//console.log(token);

//Verificacion de que el bot esta en linea
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}! Versión: 1.0.5`);
    client.user.setPresence({ 
      status:"online",
      activity:{
        name:"Youtube: GG",
        type: "WATCHING"
      }
    });
});

//Verificar los mensajes que se envian en los canales
client.on("messageCreate", async (message) => {
    //Si el mensaje es del bot, no se ejecuta la logica, para evitar loops
    if (message.author.bot) {
        return;
    }

    //Se intenta realiza logicas de respuesta
    try {
        //Se pasa el mensaje a minusculas
        const mensaje = message.content.toLowerCase();
        //console.log(mensaje);

        //Se verifica si el mensaje contiene link malicioso
        if (mensaje === "https://discordnpp.com/nitra") {
            //Se borrara el mensaje
            //ATENCION: el metodo message.chanel.delete() puede borrar todos los mensajes de un canal
            message.delete();
            //Se envia un mensaje de respuesta
            message.channel.send("mensaje malicioso eliminado");
        }

        //Se genera palabra clave para el bot
        if (mensaje == ".listcommands") {
            const exampleEmbed = new MessageEmbed()
                .setColor("#ffd046")
                .setTitle("Server Commands")
                .setDescription(
                    "Here you can see the list of the commands used on the server: "
                )
                .addFields(
                    { name: "`.like`", value: "Likes the current message" },
                    { name: "`.dislike`", value: "Dislikes the current message" },
                    { name: "`.ping`", value: "Response pong" },

                    { name: "`.random`", value: "Returns a random number" },
                  
                    { name: "`.cat`", value: "Returns a random cat image" },
                    { name: "`.dog`", value: "Returns a random dog image" },
                    { name: "`.bunny`", value: "Returns a random bunny image" },
                    { name: "`.duck`", value: "Returns a random duck image" },
                    { name: "`.fox`", value: "Returns a random fox image" },
                    { name: "`.lizard`", value: "Returns a random lizard image" },
                    { name: "`.shiba`", value: "Returns a random shiba image" },
                    { name: "`.koala`", value: "Returns a random koala image" },
                    { name: "`.panda`", value: "Returns a random panda image" },
                    {
                        name: "`.joke.ym`",
                        value: 'Returns a random joke "your mamma...  "',
                    },
                    {
                        name: "`.joke.chuck`",
                        value: 'Returns a random joke "Chuck Norris"',
                    }
                );
            message.channel.send({ embeds: [exampleEmbed] });
        }

        if (mensaje == ".like") {
            message.react("👍");
            return;
        }

        if (mensaje == ".dislike") {
            message.react("👎");
            return;
        }

        if (mensaje == ".ping") {
            message.channel.send("pong");
            return;
        }

        if (mensaje == ".random") {
            message.react("✅");
            let randomNumber = getRandomNumber(0, 1000);
            message.reply(`Your random number is ${randomNumber}.`);
            return;
        }
/*
        if (mensaje == ".cat") {
            const { file } = await fetch("https://aws.random.cat/meow").then(
                (response) => response.json()
            );
          
            console.log([file]);
          
            message.channel.send({ content: "...otro gato", files: [file] });
            return;
        }
     */
        if(mensaje == ".cat"){
          animals.cat()
          .then(url => 
            message.channel.send({ content: "...otro gato", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".dog"){
          animals.dog()
          .then(url => 
            message.channel.send({ content: "...otro perro", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".bunny"){
          animals.bunny()
          .then(url => 
            message.channel.send({ content: "...otro buonejo", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".duck"){
          animals.duck()
          .then(url => 
            message.channel.send({ content: "...otro pato", files: [url] }))
          
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".fox"){
          animals.fox()
          .then(url => 
            message.channel.send({ content: "...otro zorro", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".lizard"){
          animals.lizard()
          .then(url => 
            message.channel.send({ content: "...otro largato", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".shiba"){
          animals.shiba()
          .then(url => 
            message.channel.send({ content: "...otro shiba", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".koala"){
          animals.koala()
          .then(url => 
            message.channel.send({ content: "...otro koala", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if(mensaje == ".panda"){
          animals.panda()
          .then(url => 
            message.channel.send({ content: "...otro panda", files: [url] }))
            .catch((error) => message.channel.send("Ya lo rompiste, mi ciela."));
          
          return;
        
        }
      
        if (mensaje == ".joke.ym") {
            const joke = await fetch("https://api.yomomma.info/").then((response) =>
                response.json()
            );

            //console.log(joke.value);
            message.channel.send(joke.joke);
            return;
        }

        if (mensaje == ".joke.chuck") {
            const joke = await fetch("https://api.chucknorris.io/jokes/random").then(
                (response) => response.json()
            );

            //console.log(joke.value);
            message.channel.send(joke.value);
            return;
        }
    } catch (error) {
        message.channel.send("Ya lo rompiste, mi ciela.");
        console.log(error);
    }
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

client.login(token);