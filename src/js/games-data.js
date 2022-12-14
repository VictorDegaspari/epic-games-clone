let width = window.screen.width;
let height = window.screen.height;
function popularGames() {
    return [
        { 
            "title" : "Ghostbusters: Spirits Unleashed",
            "description": "O tempo está acabando. Economize até 75% em jogos e complementos durante a Promoção do Evento de Agosto. Acaba em 6 de setembro.", 
            "url": `https://cdn2.unrealengine.com/egs-ghostbusters-spirits-unleashed-carousel-desktop-1248x702-287e3c41c9a9.jpg?h=${height}&amp;resize=1&amp;w=${width}`
        },
        { 
            "title" : "Promoção do Evento de Outubro",
            "description": "", 
            "url": `https://cdn2.unrealengine.com/egs-dead-space-carousel-desktop-1280x702-dd365ab04db5.jpg?h=${height}&amp;resize=1&amp;w=${width}`
        },
        { 
            "title" : "Destiny 2",
            "description": "", 
            "url": `https://cdn2.unrealengine.com/egs-genshin-impact-3-1-carousel-desktop-1248x702-be2f8dc04e27.jpg?h=${height}&amp;resize=1&amp;w=${width}`
        },
        { 
            "title" : "Dead Island 2",
            "description": "", 
            "url": `https://cdn2.unrealengine.com/goatsim3-fn-carousel-desktop-1920x1080-29b18d9f6d4d.jpg?h=${height}&amp;resize=1&amp;w=${width}`
        },
        { 
            "title" : "PC Building Simulator 2",
            "description": "", 
            "url": `https://cdn2.unrealengine.com/egs-pcbs2-carousel-desktop-v2-1248x702-dd73198ef8e5.png?h=${height}&amp;resize=1&amp;w=${width}`
        },
        { 
            "title" : "Rumbleverse",
            "description": "", 
            "url": `https://cdn2.unrealengine.com/pt-br-egs-rumbleverse-desktop-carousel-image-1920x1080-730ab8cdf30b.jpg?h=${height}&amp;resize=1&amp;w=${width}`
        }
    ];
}

function games() {
    return [
        { 
            "title" : "Grand Theft Auto V: Premium Edition", 
            "url": `https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_1200x1600_Portrait Store Banner-1200x1600-382243057711adf80322ed2aeea42191.jpg?h=854&amp;resize=1&amp;w=640`,
            "current_price": "34,99",
            "old_price": "69,99",
            "discount": "-50%"
        },
        { 
            "title" : "Far Cry 6 Standard Edition", 
            "url": `https://cdn1.epicgames.com/b4565296c22549e4830c13bc7506642d/offer/TETRA_PREORDER_STANDARD%20EDITION_EPIC_Store_Portrait_1200x1600-1200x1600-ca8b802ff13813c37a44ebf68d0946a2.png?h=${height}&amp;resize=1&amp;w=${width}`,
            "current_price": "99,99",
            "old_price": "249,99",
            "discount": "-60%"
        },
        { 
            "title" : "Red Dead Redemption 2", 
            "url": `https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic%20Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=${height}&amp;resize=1&amp;w=${width}`,
            "current_price": "119,50",
            "old_price": "239",
            "discount": "-50%"
        },
        { 
            "title" : "The Witcher 3: Wild Hunt - Game of the Year Edition", 
            "url": `https://cdn1.epicgames.com/14ee004dadc142faaaece5a6270fb628/offer/EGS_TheWitcher3WildHuntGameoftheYear_CDPROJEKTRED_S2-1200x1600-d887e1b749d11e8876996227e4de5c89.jpg?h=${height}&amp;resize=1&amp;w=${width}`,
            "current_price": "99,96",
            "old_price": "",
            "discount": ""
        },
        { 
            "title" : "Riders Republic", 
            "url": `https://cdn1.epicgames.com/salesEvent/salesEvent/EN_MAD_STD_GAME_EPIC_Store_Portrait_1200x1600_EN_1200x1600-ddd4f456e3035ce50ddfa0d358efa208?h=${height}&amp;resize=1&amp;w=${width}`,
            "current_price": "149,94",
            "old_price": "249,90",
            "discount": "-60%"
        },
        { 
            "title" : "Horizon Zero Dawn™ Complete Edition", 
            "url": `https://cdn1.epicgames.com/3328b08ac1c14540aa265a1a85c07839/offer/hzd_tall-1200x1600-d4b1057afd47f9256d8da71f2f187be4.jpg?h=${height}&amp;resize=1&amp;w=${width}`,
            "current_price": "199,90",
            "old_price": "",
            "discount": ""
        }
    ];
}

export { games, popularGames };
