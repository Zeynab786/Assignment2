/********************************************************************************
*  WEB700 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Zeinab Mohamed Student ID: 123970246 Date: 30th May 2025
*
********************************************************************************/

class legoData {
  constructor() {
    this.sets = [];
  }

  initialize() {
    return new Promise((resolve, reject) => {
      try {
        const setData = require("./data/setData");
        const themeData = require("./data/themeData");

        this.sets = [];

        setData.forEach(set => {
          const themeObj = themeData.find(theme => theme.id === set.theme_id);
          this.sets.push({
            ...set,
            theme: themeObj ? themeObj.name : "Unknown"
          });
        });

        resolve(); // Initialization done
      } catch (error) {
        reject(`Initialization failed: ${error}`);
      }
    });
  }

  getAllSets() {
    return new Promise((resolve, reject) => {
      if (this.sets.length > 0) {
        resolve(this.sets);
      } else {
        reject("No sets available.");
      }
    });
  }

  getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const foundSet = this.sets.find(set => set.set_num === setNum);
      if (foundSet) {
        resolve(foundSet);
      } else {
        reject(`Set with set_num "${setNum}" not found.`);
      }
    });
  }

  getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const searchTerm = theme.toLowerCase();
      const filteredSets = this.sets.filter(set =>
        set.theme.toLowerCase().includes(searchTerm)
      );
      if (filteredSets.length > 0) {
        resolve(filteredSets);
      } else {
        reject(`No sets found matching theme "${theme}".`);
      }
    });
  }
}

// === Test code ===

let data = new legoData();

data.initialize()
  .then(() => {
    return data.getAllSets();
  })
  .then(allSets => {
    console.log(`Number of Sets: ${allSets.length}`);
    return data.getSetByNum("0012-1");
  })
  .then(set => {
    console.log(set);
    return data.getSetsByTheme("tech");
  })
  .then(techSets => {
    console.log(`Number of 'tech' sets: ${techSets.length}`);
  })
  .catch(err => {
    console.error("Error:", err);
  });
