const Discord = require('discord.js')
const Gamedig = require('gamedig')
const client = new Discord.Client();
const {token,host,port } = require('./config.json')




client.on('ready', () => {
    console.log(client.user.username + " has been started")

})

client.on("message", (message) => {

    if (message.content == "!status") {

        Gamedig.query({
            type: "garrysmod",
            host: host,
            port: port
        }).then((state) => {
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Status du serveur")
                .addField("Collection", "[Cliquez ici](https://steamcommunity.com/sharedfiles/filedetails/?id=ID)",true)
                .addField("Latence",state.ping + "ms",true)
                .addField("Nom", state.name)
                .addField("Joueurs en ligne",`${state.players.length}/${state.maxplayers}`,true)
                .addField("Map",state.map,true)


            message.channel.send(embed)
        }).catch((error) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Status du serveur")
                .setDescription("Le serveur est actuellement hors-ligne.")

            message.channel.send(embed)

        })


    }

})


client.login(token)
