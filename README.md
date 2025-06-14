# HavikkiHaly web-sovellus

HavikkiHaly web-sovellus esittää HavikkiHaly [mobiilisovelluksen](https://github.com/Biodibi/kiertotalous_app) keräämät tiedot kauppojen jatkojalostukseen toimittamasta hävikistä ilmastovaikutuksina halutulta aikaväliltä. Ilmastovaikutukset lasketaan ilmoitetun hedelmä- ja vihanneshävikin perusteella hiilidioksidin ja metaanin määränä kiloina, joka säästetään, kun hävikki ei päädy jätteeksi, vaan jalostetaan ruoaksi. Laskennassa otetaan huomioon myös kuljetuksesta ja tuotannosta aiheutuvat päästöt.

## Sovelluksen toiminta

HavikkiHaly web-sovellusta voivat käyttää kaupat, jotka ilmoittavat ruokahävikistä tai ruokahävikkiä jatkojalostavat hyödyntäjät. Kaupat näkevät sivustolta helposti toimitetun ruokahävikin määrän kiloina sekä ilmastovaikutuksena säästetyn hiilidioksidin ja metaanin määrän kiloina halutulta aikaväliltä. Hyödyntäjä näkee vastaavat asiat kaikkien niiden kauppojen osalta, joista ruokahävikkiä on noudettu.

HavikkiHaly web-sovellukseen kirjaudutaan käyttäjätunnuksilla. Käyttäjätilejä on kahta eri tyyppiä: kaupan ja hyödyntäjän tili. Tämän perusteella määritellään, mitä tietoja ruokahävikistä sivusto näyttää. Esimerkiksi kaupan tilillä kirjauduttaessa ruokahävikki ja saavutetut ilmastohyödyt näytetään vain valitun kaupan osalta.

![Kirjautuminen sovellukseen](https://github.com/Biodibi/kiertotalous_web/blob/master/images/kiertotalous_login.png)

Web-sovellus koostuu yhdestä pääsivusta, jossa näytetään neljä osiota:

1. Kuluneen vuoden hävikki ja saavutetut ilmastohyödyt
2. Kuluvan kuukauden hävikki ja saavutetut ilmastohyödyt
3. Kuluvan vuoden hävikit ja saavutetut ilmastosvaikutukset kuukausittain 
4. Kerätyt hävikit valitulta kuukaudelta

![Sovelluksen päänäkymä](https://github.com/Biodibi/kiertotalous_web/blob/master/images/kiertotalous_paanakyma.png)

Käyttäjä voi vaihtaa tarkasteltavaa kuukautta 3. osiosta (vasemmalla alhaalla), jolloin 2.osiossa (oikealla ylhäällä) sekä 4. osiossa (oikealla alhaalla) olevat tiedot päivittyvät valitun kuukauden mukaisiksi.

Tässä vaiheeessa muita toiminnallisuuksia ei ole toteutettu, mutta tallennetun tiedon perusteella voidaan tarvittaessa luoda 
helposti erilaisia näkymiä tai tilastoja kerätystä ruokahävikistä ja saavutetuista ilmastohyödyistä ei aikaväleiltä.

## Ilmastovaikutuksen laskenta

Hedelmä- ja vihanneshävikistä syntyvän biokaasun määrä lasketaan seuraavilla kertoimilla:

```
1 kg jätettä tuottaa 0,3983 kg hiilidioksisia.
1 kg jätettä tuottaa 0,2336 kg metaania.
```

Kuljetuksesta syntyy päästöjä seuraavasti:

```
1 litra dieseliä tuottaa 2.6890 kg hiilidioksidia.
1 litra bensiiniä tuottaa 2.3480 kg hiilidioksidia.
1 kWh sähköä tuottaa 0.0960 kg hiilidioksidia.
1 kg biokaasua tuottaa 0.0000 kg hiilidioksidia.
```

Tuotannosta aiheutuvat päästöt lasketana ohjelmaan asetetulla kertoimella, minkä perusteella saavutetuista ilmastohyödyistä vähennetään tuotannosta aiheutuneet päästöt. Tässä web-sovelluksessa kertoimena on käytetty 10%.

Saavutettujen ilmastohyötyjen kokonaisvaikutus lasketaan kertomalla noudetun hedelmä- ja vihannesjätteen määrä yllä mainitulla kertoimilla, jolloin saadaan laskettua syntyvä biokaasun määrä, joka säästetään, kun hävikki ei päädy jätteeksi. Tästä vähennetään kuljetuksesta ja tuotannosta aiheutuneet päästöt, jolloin saadaan ilmastohyötyjen kokonaisvaikutus.

## Sovelluksen toteutuksessa käytetyt tekniikat

HavikkiHaly web-sovellus on toteutettu Reactin versiolla 18. Sovelluksen toteuttamisessa on käytetty seuraavia React-kirjastoja:

1. [react-router-dom](https://www.npmjs.com/package/react-router-dom)
2. [axios](https://www.npmjs.com/package/axios)
3. [uuid](https://www.npmjs.com/package/react-uuid)

API-rajapinta on toteutettu käyttämällä [Firebasea](https://firebase.google.com). Tämä repositorio ei sisällä rajapinnan lähdekoodia. API-rajapinnan kuvaus on tässä dokumentissa jäljempänä. Tarvittaessa API-rajapinta voidaan toteuttaa periaatteessa millä tahansa tekniikalla toteuttamalla REST-palvelu, joka tuottaa dokumentaation mukaisia JSON-viestejä.

## Sovelluksen käyttöönotto

Sovellus tarvitsee toimiakseen React-ympäristön. Tämä sovellus on toteutettu käyttämällä [Create React App -työkalua](https://reactjs.org/docs/create-a-new-react-app.html). 

Sovelluksen testausta varten on luotu Node/express-tekniikoilla fakeapi, joka matkii sovelluksen API-rajapinnan tuottamaa tietoa.

Asenna ja ota sovellus käyttöön seuraavasti:

1. Asenna Node ja React työasemaasi tarvittaessa
2. Kloonaa tiedostot omaan työasemaasi komennolla git clone 
3. Käynnistä fakeapi komennolla node index.js alikansiossa fakeapi
4. Aja npm i -komento projektin juuressa
5. Aja npm start -komento projektin juuressa

## Sovelluksen käyttämä API-rajapinta

HavikkiHaly web-sovellus tarjoaa kolme  REST-rajapintaa tietojen hakemiseen. Aluksi käyttäjä tunnistetaan user-rajapinnan avulla, joka palauttaa käyttäjä-objektin. Objekti sisältää mm. siteId- ja userId-kentät, joita käytetään myöhemmissä kutsuissa tunnistautumiseen sekä parametrina haettaville tiedoille. 


### Käyttäjän tietojen hakeminen

User-rajapinta palauttaa käyttäjän tiedot. Käyttäjään liittyviä tietoja tarvitaan, jotta kiertotalous API:in voidaan tehdä muita kutsuja eli tämä kutsu tulee suorittaa ensimmäisenä ennen muita kutsuja

GET /user/email/{email}/password/{password}	

**Parametrit**
```
email	 string in path käyttäjän sähköpostiosoite

password string in path käyttäjän salasana
```

**Esimerkkikutsu**

`https://kiertotalous.foo/user/email/test@foo.com/password/test`

**Palauttaa**

```
{
  "userId": "8pS9GgWyzdRULrtPLYcogPincev2",
  "name": "Testi käyttäjä",
  "email": "testi@foo.test",
  "role": "store",
  "siteId": "6177e011e79ed401fc1e5b76",
  "created": 1638262299,
  "modified": 1638262299
}
```

| Kenttä   | Tietotyyppi | Selite                                |
| ---------| ------------| ------------------------------------- |
| userId   | string      | Käyttäjän id                          |
| name     | string      | Käyttäjän nimi                        |
| email    | string      | Käyttäjän sähköpostiosoite            |
| role     | string      | Käyttäjän rooli (store/courier/admin) |
| siteId   | string      | Toimipaikan id (esim. kauppa)         |
| created  | epoch       | Tiedon luontiaika                     |
| modified | epoch       | Tiedon muokkausaika                   |

### Ilmastovaikutus toimipaikan mukaan

Climate-impact-by-site -rajapinta palauttaa ilmastovaikutuksen laskennan tulokset sekä kertyneen hävikin tiedot halutulta aikaväliltä toimipaikan (site) mukaan. Tällä rajapinnalla esimerkiksi ruokakauppa voi hakea tiedon siitä, kuinka paljon ruokahävikkiä on syntynyt ja mikä on saavutettu ilmastohyöty.

GET /climate-impact-by-site /{siteId}

**Parametrit**
```
siteId	string in path toimipaikan id

starts  epoch in query aikavälin alkupäivä

ends    epoch in query aikavälin loppupäivä
```

**Esimerkkikutsu**

`https://kiertotalous.foo/climate-impact-by-site/6177e011e79ed401fc1e5b76?starts=1636615862&ends=1655515976`

**Palauttaa**

Rajapinta palauttaa noudetut hävikit taulukossa sekä yhteenvedon, josta käy ilmi noudetun ruokahävikin määrä sekä ilmastolaskennan tulokset.  

```
{
  "deliveries": [{
    "uid": "5177e011e79ed401fc1e5b74",
    "weight": 50,
    "created": 1636615862
  },
  {
    "uid": "6177e011e79ed401fc1e5b74",
    "weight": 30,
    "created": 1636615862
  }],
  "summary": {
    "weight": 80,
    "c02Reduction": 31.864, 
    "ch4Reduction": 18.688, 
    "transportationC02Emissions": 10,
    "productionC02Emissions": 5,
    "totalC02Reduction": 16.864,
    "totalCh4Reduction": 18.688
  }
}
```

| Kenttä                     | Tietotyyppi | Selite                                                                                          |
| -------------------------- | ------------| ----------------------------------------------------------------------------------------------- |
| uid                        | string      | Noudon/toimituksen tunniste                                                                     |
| weight                     | float       | Ruokahävikin määrä kiloissa                                                                     |
| created                    | epoch       | Ruokahävikin noutopaivä ja aika                                                                 |
| c02Reduction               | float       | Ruokahävikin painon perusteella laskettu ilmastohyötynä saavutetun hiilidioksidin määrä kiloina |
| ch4Reduction               | float       | Ruokahävikin painon perusteella laskettu ilmastohyötynä saavutetun metaanin määrä kiloina       |
| transportationC02Emissions | float       | Kuljetuksesta aiheutuneet hiilidioksidipäästöt kiloina                                          |
| productionC02Emissions     | float       | Tuotannosta aiheutuneet hiilidioksidipäästöt kiloina                                            |
| totalC02Reduction          | float       | Ilmastohyötynä saavutetun hiilidioksidin kokonaismäärä kiloina                                  |
| totalCH4Reduction          | float       | Ilmastohyötynä saavutetun metaanin kokonaismäärä kiloina                                        |

### Ilmastovaikutus käyttäjän mukaan

Climate-impact-by-user -rajapinta palauttaa ilmastovaikutuksen laskennan tulokset sekä kertyneen ruokahävikin tiedot halutulta aikaväliltä käyttäjän (user) mukaan. Tällä rajapinnalla esimerkiksi ruokahävikin hyödyntäjä voi hakea tiedon noudetuista hävikeistä sekä tiedot saavutetuista ilmastohyödyistä. 

GET /climate-impact-by-user /{userId}

**Parametrit**
```
userId	string in path käyttäjän id

starts  epoch in query aikavälin alkupäivä

ends    epoch in query aikavälin loppupäivä
```
**Esimerkkikutsu**

`https://kiertotalous.foo/climate-impact-by-user/ gvbLDLox2NfydRno73LFXDGHYkw?starts=1636615862&ends=1655515976`

**Palauttaa**

Rajapinta palauttaa noudetut hävikit taulukossa sekä yhteenvedon, jota käy ilmi noutopaikat, noudetun ruokahävikin määrä sekä ilmastolaskennan tulokset.  Palautettavat tiedot sisältävät myös toimipaikkojen (noutopaikkojen) yhteystiedot sekä sijainnin.  

```
{
  "deliveries": [{
    "uid": "5177e011e79ed401fc1e5b74",
    "siteiId": "4177e011e79ed401fc1e5b74",
    "name": "Linnanmaan Prisma",
    "address": "Kauppalinnankuja 1-3",
    "zipCode": "90570",
    "city": "Oulu",
    "phone": "04012345678",
    "location": {
        "latitude": 65.05442506685405,
        "longitude": 25.456211028450884
    },
    "weight": 50,
    "created": 1636615862,
    "expires": 1636615862
  },
  {
    "uid": "6177e011e79ed401fc1e5b74",
    "siteId": "5177e011e79ed401fc1e5b75",
    "name": "Raksilan Prisma",
    "address": "Tehtaankatu 3",
    "zipCode": "90130",
    "city": "Oulu",
    "phone": "0401234567",
    "location": {
        "latitude": 65.01076584569643,
        "longitude": 25.490870864189056
    },
    "weight": 30,
    "created": 1636615862,
    "expires": 1636615862
  }],
  "summary": {
    "weight": 80,
    "c02Reduction": 31.864, 
    "ch4Reduction": 18.688, 
    "transportationC02Emissions" : 10,
    "productionC02Emissions": 5,
    "totalC02Reduction": 16.864,
    "totalCh4Reduction": 18.688
  }
}

```

| Kenttä                     | Tietotyyppi | Selite                                                                                          |
| -------------------------- | ------------| ----------------------------------------------------------------------------------------------- |
| uid                        | string      | Toimituksen tunniste                                                                            |
| siteId                     | string      | Toimipaikan (kaupan) id, josta ylijäämä noudettu                                                |
| name                       | string      | Toimipaikan nimi                                                                                |
| address                    | string      | Toimipaikan osoite                                                                              |
| zipCode                    | string      | Toimipaikan postinumero                                                                         |
| city                       | string      | Kaupunki, jossa toimipaikka sijaitsee                                                           |
| phone                      | string      | Toimipaikan puhelinnumero                                                                       |
| latitude                   | float       | Toimipaikan sijainnin leveyspiiri                                                               |
| longitude                  | float       | Toimipaikan sijainnin pituuspiiri                                                               |
| weight                     | float       | Noudetun ylijäämän määrä kiloissa                                                               |
| created                    | epoch       | Ruokahävikin noutopaivä ja aika                                                                 |
| c02Reduction               | float       | Ruokahävikin painon perusteella laskettu ilmastohyötynä saavutetun hiilidioksidin määrä kiloina |
| ch4Reduction               | float       | Ruokahävikin painon perusteella laskettu ilmastohyötynä saavutetun metaanin määrä kiloina       |
| transportationC02Emissions | float       | Kuljetuksesta aiheutuneet hiilidioksidipäästöt kiloina                                          |
| productionC02Emissions     | float       | Tuotannosta aiheutuneet hiilidioksidipäästöt kiloina                                            |
| totalC02Reduction          | float       | Ilmastohyötynä saavutetun hiilidioksidin kokonaismäärä kiloina                                  |
| totalCH4Reduction          | float       | Ilmastohyötynä saavutetun metaanin kokonaismäärä kiloina                                        | 

## Lisenssi

Tämän projektin lähdekoodi on lisenssoitu MIT-lisenssillä. Katso lisenssin tiedot tarkemmin [LICENSE](https://github.com/Biodibi/kiertotalous_web/blob/master/LICENSE.md) tiedostosta. Mikäli sovelluksessa on käytetty kolmannen osapuolen työkaluja,  komponenentteja tai vastaavia, noudetetaan niiden osalta ilmoitettuja lisenssiehtoja.

# zipli-host
# zipli-host
