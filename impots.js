function Personne(params) {
  this.salaire = params.salaire;
  this.revenusNus = params.revenusNus;
  this.revenusMeuble = params.revenusMeuble;
  this.nbPart = params.nbPart;
  this.revenusTotal = this.calcRevenusTotal();
  this.revenusMensuelAvantImpot = this.calcRevenusMensuelAvantImpot();

  this.impots = [
    { nom: "Taxe foncière Raismes", montant: 600 },
    { nom: "Taxe foncière Roubaix", montant: 289 },
    { nom: "Taxe foncière St Amand", montant: 360 }
  ];
  this.calcImpotFoncier(this.revenusNus);
  this.calcImpotFoncier(this.revenusMeuble, true);
  this.calcImpotRevenus(this.revenusTotal, this.nbPart);
  this.impotTotal = this.calcImpotTotal();
  this.revenusMensuelApresImpots = this.calcRevenusMensuelApresImpots();
}
Personne.prototype.calcRevenusTotal = function() {
  return this.salaire + this.revenusNus + this.revenusMeuble;
};
Personne.prototype.calcRevenusMensuelAvantImpot = function() {
  return this.revenusTotal / 12;
};

Personne.prototype.calcImpotFoncier = function(revenus, meuble = false) {
  let nom, baseImposable;
  if (meuble) {
    nom = "Impot revenus meublés";
    baseImposable = revenus * 0.5;
  } else {
    nom = "Impot revenus nus";
    baseImposable = revenus * 0.7;
  }
  // CSG, CRDS, PREL SOC CONT ADD, PREL SOL
  this.impots.push({
    nom: nom,
    montant: baseImposable * 0.7 * (0.099 + 0.005 + 0.048 + 0.02)
  });
};
Personne.prototype.calcImpotRevenus = function(revenus, nbPart) {
  // Etape 1 : diviser son revenu imposable par le nombre de parts
  const tmp = revenus / nbPart;
  let impotRevenu = 0;
  // Etape 2 : appliquer à chaque tranche son taux d'imposition
  tranches = [
    { min: 0, max: 9964, taux: 0 },
    { min: 9965, max: 27519, taux: 0.14 },
    { min: 27520, max: 73779, taux: 0.3 },
    { min: 73780, max: 156244, taux: 0.41 }
  ];
  for (let i = 0; i < tranches.length; i++) {
    const tranche = tranches[i];
    let max;
    if (tranche.max > tmp) {
      max = tmp;
      impotRevenu += (max - tranche.min) * tranche.taux;
      break;
    } else {
      max = tranche.max;
    }
    impotRevenu += (max - tranche.min) * tranche.taux;
  }
  // Etape 3 : additionner les impositions et multiplier le total par le nombre de parts
  this.impots.push({
    nom: "Impot revenus",
    montant: impotRevenu * nbPart
  });
};
Personne.prototype.calcImpotTotal = function() {
  let impotTotal = 0;
  this.impots.forEach(impot => {
    impotTotal += impot.montant;
  });
  return impotTotal;
};
Personne.prototype.calcRevenusMensuelApresImpots = function() {
  return (this.revenusTotal - this.impotTotal) / 12;
};

const toto15coloc2 = new Personne({
  salaire: 1050 * 12,
  revenusNus: (550 + 410) * 12,
  revenusMeuble: 300 * 2 * 12,
  nbPart: 1.5
});

revenuTotal = 700;
// [
//     ['Year', 'Sales', 'Expenses'],
//     ['2004',  1000,      400],
//     ['2005',  1170,      460],
//     ['2006',  660,       1120],
//     ['2007',  1030,      540]
//   ]
let P10, P15, diff;
while (revenuTotal <= 5000) {
  PA = (revenuTotal - RSA) * proportion * nbEnfant;
  P15 = new Personne({
    salaire: revenuTotal * 12,
    revenusNus: 0,
    revenusMeuble: 0,
    // salaire: 1000 * 12,
    // revenusNus: (550 + 410) * 12,
    // revenusMeuble: 300 * 2 * 12,
    nbPart: 1.5
  });
  console.log(P15);

  P10 = new Personne({
    salaire: revenuTotal * 12,
    revenusNus: 0,
    revenusMeuble: 0,
    // salaire: 1000 * 12,
    // revenusNus: (550 + 410) * 12,
    // revenusMeuble: 300 * 2 * 12,
    nbPart: 1
  });
  diff = (P10.impots[5].montant - P15.impots[5].montant) / 12;
  console.log(P10.impots[5].montant);
  console.log(P15.impots[5].montant);

  console.log(diff);

  points.push([revenuTotal, PA, diff]);

  revenuTotal += 100;
}
