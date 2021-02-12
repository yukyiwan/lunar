var data2021 = [
  [5, 4, 8, 6, 4], //ox
  [7, 6, 7, 6, 7], //rat
  [6, 6, 7, 6, 6], //pig
  [7, 8, 7, 7, 5], //dog
  [7, 6, 8, 6, 4], //rooster
  [8, 7, 9, 8, 6], //monkey
  [5, 4, 6, 6, 4], //goat
  [7, 7, 8, 8, 6], //horse
  [8, 7, 9, 5, 6], //snake
  [7, 7, 8, 6, 6], //dragon
  [6, 5, 6, 6, 6], //rabbit
  [9, 7, 8, 8, 8], //tiger
];

var kayden = function (kayden) {

//First data processing class: year of birth and zodiac data conversion
  kayden.Loadsigndata = class Loadsigndata {
    constructor (year=0, thisYear=2021) {
      this._year = year;
      this._thisYear = thisYear;
      this._animal =  thisYear - year;
      while (this._animal > 11) {
        this._animal = this._animal - 12;
      }
      // console.log(this._animal);
      return data2021[this._animal]
    }
    get year() {
      return this._year;
    }
    set year(value) {
      this._year = value;
    }
    get thisYear() {
      return this._thisYear;
    }
    set thisYear(value) {
      this._thisYear = value;
    }
  }

//Second data processing class: new array formation from getting the first data (overall luck) of each child element (zodiac sign)
  kayden.Zodiac = class Zodiac {
    constructor() {
        this.zodiac=[];
        loop(data2021.length, (i)=>{
          this.zodiac.push(data2021[i][0]);
        });
        return this.zodiac;
    }
  }

  return kayden;
} (kayden || {});
