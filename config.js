module.exports = {
mysqlhost : 'localhost',
mysqluser : 'WS2',
mysqlpass : 'qwertz123',
mysqlname : 'WS2',

port : 7093,
secret : 'windshield',



athletequery : {  // Hier befinden sich die Einstellungen für die alternativen Athletenfilter
  filter : [
    
    {
      name : 'age',
      alt: ['alter']
    },
    {
      name : 'ag',
      alt : ['ak', 'altersklasse']
    },
    {
      name : 'year',
      alt : ['jahrgang', 'jahr', 'jg']
    },
    {
      name : 'rank',
      alt : ['rang']
    },
    {
      name : 'unit',
      alt : ['einheit', 'staffel']
    },
    {
      name : 'gender',
      alt : ['geschlecht']
    }
  ],
  operator : [
    {
      origin : ':',
      alt : [': ', ' :', ' : ']
    }
  ],
  ag : {
    1 : [18 , 19],
    2 : [20, 24],
    3 : [25 , 29],
    4 : [30 , 34],
    5 : [35 , 39],
    6 : [40 , 44],
    7 : [45 , 49],
    8 : [50 , 54],
    9 : [55 , 59],
    10 : [60 , 64],
    11 : [65 , 69]
  }
};


}
