// Fuzzy rules based on A1-A9 inputs
const fuzzyRules = [
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 0, A8: 0, A9: 0 }, output: 0 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 0, A8: 0, A9: 1 }, output: 1 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 0, A8: 1, A9: 0 }, output: 1 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 0, A8: 1, A9: 1 }, output: 2 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 1, A8: 0, A9: 0 }, output: 1 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 1, A8: 0, A9: 1 }, output: 2 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 1, A8: 1, A9: 0 }, output: 2 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 1, A8: 1, A9: 1 }, output: 3 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 0, A8: 0, A9: 0 }, output: 1 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 0, A8: 0, A9: 1 }, output: 2 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 0, A8: 1, A9: 0 }, output: 2 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 0, A8: 1, A9: 1 }, output: 3 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 1, A8: 0, A9: 0 }, output: 2 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 1, A8: 0, A9: 1 }, output: 3 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 1, A8: 1, A9: 0 }, output: 3 },
  { inputs: { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 1, A7: 1, A8: 1, A9: 1 }, output: 4 },
  // Remaining 496 rules added dynamically below
  ...Array.from({ length: 496 }, (_, i) => {
    const binary = (i + 16).toString(2).padStart(9, '0').split('').map(Number);
    return {
      inputs: {
        A1: binary[0],
        A2: binary[1],
        A3: binary[2],
        A4: binary[3],
        A5: binary[4],
        A6: binary[5],
        A7: binary[6],
        A8: binary[7],
        A9: binary[8],
      },
      output: Math.min(binary.reduce((a, b) => a + b), 9),
    };
  })
];

// Function to calculate fuzzy score
function calculateFuzzyScore(answers) {
  for (const rule of fuzzyRules) {
    let match = true;
    for (const key in rule.inputs) {
      if (rule.inputs[key] !== answers[key]) {
        match = false;
        break;
      }
    }
    if (match) return rule.output;
  }
  return 0; // Default if no rule matches
}

// Example usage
const answers = { A1: 1, A2: 1, A3: 1, A4: 1, A5: 1, A6: 1, A7: 1, A8: 1, A9: 1 };
const totalScore = calculateFuzzyScore(answers);

// Determine category based on score
let resultHTML = '';
if (totalScore >= 0 && totalScore <= 3) {
  resultHTML = `
    <div class="alert alert-success">
      <h5><i class="icon fas fa-smile"></i>Mental Health Anda Sehat!</h5>
      <p>Berdasarkan hasil screening kesehatan mental, Anda berada dalam kondisi yang baik. 
        Tetap jaga kesehatan fisik dan mental Anda. Jangan lupa untuk terus melakukan aktivitas 
        yang membuat Anda bahagia dan rileks!</p>
    </div>`;
} else if (totalScore >= 4 && totalScore <= 6) {
  resultHTML = `
    <div class="alert alert-warning">
      <h5><i class="icon fas fa-exclamation-circle"></i>Mental Health Anda Kurang Stabil, Anda Membutuhkan Dukungan!</h5>
      <p>Berdasarkan hasil screening kesehatan mental, saat ini kondisimu tergolong kurang stabil. 
        Kamu mungkin membutuhkan sedikit bantuan untuk melewati situasi ini. Jangan ragu untuk 
        bercerita kepada orang yang kamu percaya ya. Selalu ingat, kamu tidak sendirian.</p>
    </div>`;
} else if (totalScore >= 7 && totalScore <= 9) {
  resultHTML = `
    <div class="alert alert-danger">
      <h5><i class="icon fas fa-frown"></i> Mental Health Anda Tidak Sehat!</h5>
      <p>Berdasarkan hasil screening kesehatan mental, menunjukkan adanya gejala permasalahan psikologis. 
        Sebaiknya kamu menemui psikolog atau psikiater untuk mendapatkan bantuan profesional.</p>
    </div>`;
}

// Display result
$('#step14Result').html(resultHTML);
console.log(`Total Score: ${totalScore}`);
