// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// returns an object, mutates it, compare object
function pAequorFactory (number, bases) {
  return {
    specimenNum: number,
    dna: bases,
    mutate() {
      let thisDna = this.dna;
      console.log("this is the selected base:");
      let index = Math.floor(Math.random() * thisDna.length);
      console.log("index is " + index)
     
      let oldBase = thisDna[index];
      console.log("old base is " + oldBase)

      let newBase = returnRandBase();
      console.log("new base is " + newBase);

      function mutation () { 
        thisDna.splice(index, 1, newBase);
        return thisDna       
      }

      if (oldBase !== newBase) {
        console.log("Mutation can begin")
        mutation();
        console.log(thisDna)
       } else {
        console.log("Mutation failed, try again");
        this.mutate();
      }
    }, // mutate end

    compareDNA(objToCompare) {
        console.log("Comparing begins");
        let matches = [];
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === objToCompare.dna[i]) {
            matches.push(this.dna[i])
          }
        }

        let difference = (matches.length / this.dna.length * 100).toFixed(1);
            console.log("matches: " + matches);
            console.log(`The pAequor object id ${this.specimenNum} and the pAequor object id ${objToCompare.specimenNum} have ${difference}% of identical DNA.`);
    
    return [parseFloat(difference), this.specimenNum, objToCompare.specimenNum]
    }, // compareDNA end

    willLikelySurvive() {
      let amountCG = 0;
      for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === "C" || this.dna[i] === "G") {
            amountCG++;
          }};
      let chanceToSurvive = (amountCG/this.dna.length*100).toFixed(1);
      return chanceToSurvive >= 60 ? true : false
    } //willLikelySurvive end
  } // object end
} //function pAequorFactory end

//Create instances
function createSamples () {
  let id = 1;
  let thirtySamples = [];
  while (thirtySamples.length < 30) {
      let newSample = pAequorFactory(id, mockUpStrand());
      if (newSample.willLikelySurvive()) {
       thirtySamples.push(newSample);
      id++;}
  }
  return thirtySamples;
} // createSamples end

// create complementary DNA strand
function complementStrand(strand) {
  let complementaryStrand = [];
  strand.forEach((element) => {
        switch (element) {
          case 'A':
            complementaryStrand.push('T');
            break;          
            case 'T':
            complementaryStrand.push('A');
            break;
            case 'C':
            complementaryStrand.push('G');
            break;          
            case 'G':
            complementaryStrand.push('C');
            break;
        }
    }
  );
  return complementaryStrand;
} // complementStrand end

// most related instances
let mostRelatedSamples = [];
let findMostRelatedSamples = (batch) => {
  for (let i = 0; i < samples.length; i++) {
    for (let k = i + 1; k < samples.length; k++) {
            let allData = samples[i].compareDNA(samples[k]);
            mostRelatedSamples.push(allData)
    }
}

    let sortedArray = mostRelatedSamples.sort(([a, b], [c, d]) => c - a || b - d);

    const bestMatches = sortedArray.filter(item => {
    if (item[0] === sortedArray[0][0])
    return item;
});

    console.log("***********************************")
    console.log(`The most related instances of pAequor are matching in ${bestMatches[0][0]}%. In this batch there are ${bestMatches.length} pairs with the same result.`)

    bestMatches.forEach((element) => console.log(`Sample id: ${element[1]} and ${element[2]}`));
} // findMostRelatedSamples end


// // TESTING
// console.log("Random base: " + returnRandBase());
// console.log("Random strand: " + mockUpStrand());
// let testDna1 = pAequorFactory(1, mockUpStrand());
// let testDna2 = pAequorFactory(2, mockUpStrand());
// console.log("DNA ONE: " + testDna1.dna);
// console.log("DNA TWO: " + testDna2.dna);
// testDna1.mutate();
// console.log("DNA ONE: " + testDna1.dna);
// console.log("DNA TWO: " + testDna2.dna);
// testDna1.compareDNA(testDna2);
// console.log("DNA TWO SURVIVE?: " + testDna1.willLikelySurvive());
// console.log("Complementary strands:");
// console.log(`Original strand is: ${testDna1.dna}`);
// console.log(`Complementary strand is: ${complementStrand(testDna1.dna)}`);

// *************** 30 samples
// let samples = createSamples();
// console.log(samples);
// findMostRelatedSamples(samples);
