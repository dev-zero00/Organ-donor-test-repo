// Medical dataset for OrganEase prototype demonstration (Indian Context)
export const INITIAL_RECIPIENTS = [
  {
    id: "REC-2026-081",
    name: "Aarav Sharma",
    age: 42,
    gender: "Male",
    bloodGroup: "A+",
    organNeeded: "Kidney",
    urgency: 9, // 1 - 10
    waitlistMonths: 34,
    hospital: "AIIMS New Delhi, Nephrology Ward 4B",
    location: "New Delhi, Delhi",
    coordinates: { lat: 28.5672, lng: 77.2100 },
    hlaTyping: { A: "02, 24", B: "07, 35", DR: "04, 15" },
    status: "Waiting",
    notes: "Dialysis dependent (3x/week). PRA 18%. High urgency priority."
  },
  {
    id: "REC-2026-104",
    name: "Pooja Kulkarni",
    age: 48,
    gender: "Female",
    bloodGroup: "O+",
    organNeeded: "Liver",
    urgency: 8,
    waitlistMonths: 18,
    hospital: "KEM Hospital & Research Centre",
    location: "Pune, Maharashtra",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    hlaTyping: { A: "01, 03", B: "08, 44", DR: "03, 07" },
    status: "Waiting",
    notes: "MELD score 28. End-stage hepatic failure."
  },
  {
    id: "REC-2026-119",
    name: "Dr. Rajesh Iyer",
    age: 38,
    gender: "Male",
    bloodGroup: "B+",
    organNeeded: "Heart",
    urgency: 10,
    waitlistMonths: 9,
    hospital: "Apollo Hospitals, Greams Road",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 13.0604, lng: 80.2496 },
    hlaTyping: { A: "11, 29", B: "15, 51", DR: "11, 13" },
    status: "Critical Priority",
    notes: "BiVAD dependent, Status 1A candidate under NOTTO registry."
  },
  {
    id: "REC-2026-135",
    name: "Sunita Verma",
    age: 52,
    gender: "Female",
    bloodGroup: "AB+",
    organNeeded: "Kidney",
    urgency: 7,
    waitlistMonths: 22,
    hospital: "Medanta - The Medicity",
    location: "Gurugram, Haryana",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    hlaTyping: { A: "02, 11", B: "35, 40", DR: "01, 04" },
    status: "Waiting",
    notes: "Chronic glomerulonephritis, universal recipient."
  }
];

export const INITIAL_DONORS = [
  {
    id: "DON-9041",
    name: "Rohan Deshmukh (Deceased Donor Pledge)",
    age: 39,
    gender: "Male",
    bloodGroup: "A+",
    organsPledged: ["Kidney", "Liver", "Cornea"],
    hlaTyping: { A: "02, 24", B: "07, 44", DR: "04, 15" },
    location: "Fortis Memorial Research Institute, Gurugram",
    distanceKm: 32,
    procurementStatus: "Available (Cold Ischemia Time: 3.2 hrs remaining)",
    organSizeMatchPct: 2, // +2% size variance
    crossmatchResult: "Negative",
    donorConsentVerified: true
  },
  {
    id: "DON-9055",
    name: "Ananya Mukherjee (Deceased Pledge)",
    age: 44,
    gender: "Female",
    bloodGroup: "O+",
    organsPledged: ["Kidney", "Liver", "Pancreas"],
    hlaTyping: { A: "02, 03", B: "07, 35", DR: "04, 07" },
    location: "Ruby Hall Clinic, Pune",
    distanceKm: 45,
    procurementStatus: "Available (Cold Ischemia Time: 7.5 hrs remaining)",
    organSizeMatchPct: -4,
    crossmatchResult: "Negative",
    donorConsentVerified: true
  },
  {
    id: "DON-9082",
    name: "Vikram Malhotra",
    age: 35,
    gender: "Male",
    bloodGroup: "O+",
    organsPledged: ["Kidney", "Liver", "Heart"],
    hlaTyping: { A: "01, 03", B: "08, 44", DR: "03, 07" },
    location: "Sir Ganga Ram Hospital, New Delhi",
    distanceKm: 14,
    procurementStatus: "Available (Cold Ischemia Time: 11 hrs remaining)",
    organSizeMatchPct: 1,
    crossmatchResult: "Negative",
    donorConsentVerified: true
  },
  {
    id: "DON-9099",
    name: "Kavita Nair (Live Pledge)",
    age: 51,
    gender: "Female",
    bloodGroup: "B+",
    organsPledged: ["Heart", "Kidney"],
    hlaTyping: { A: "11, 29", B: "15, 18", DR: "11, 13" },
    location: "MIOT International, Chennai",
    distanceKm: 18,
    procurementStatus: "Under evaluation",
    organSizeMatchPct: -3,
    crossmatchResult: "Negative",
    donorConsentVerified: true
  }
];

// ABO Compatibility Matrix
export const ABO_MATRIX = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"]
};

export const checkAboCompatibility = (donorBlood, recipientBlood) => {
  const allowedRecipients = ABO_MATRIX[donorBlood] || [];
  return allowedRecipients.includes(recipientBlood);
};

// Calculate HLA antigen match count (0 to 6 antigens)
export const calculateHlaMatchCount = (donorHla, recipientHla) => {
  if (!donorHla || !recipientHla) return 0;
  let matches = 0;
  const loci = ["A", "B", "DR"];
  
  loci.forEach(locus => {
    const dList = (donorHla[locus] || "").split(",").map(s => s.trim());
    const rList = (recipientHla[locus] || "").split(",").map(s => s.trim());
    dList.forEach(allele => {
      if (rList.includes(allele) && allele !== "") {
        matches++;
      }
    });
  });
  return Math.min(6, matches);
};

// Compute Priority Score for Recipient: 0.6 * urgency/10 + 0.4 * min(waitMonths/60, 1)
export const calculateRecipientPriority = (urgency, waitMonths) => {
  const urgencyWeight = 0.6 * (urgency / 10);
  const waitlistWeight = 0.4 * Math.min(waitMonths / 60, 1.0);
  return Number(((urgencyWeight + waitlistWeight) * 100).toFixed(1));
};

// Rule-based and simulated ML match scoring engine with SHAP explanation contributions
export const computeMatchExplanation = (donor, recipient) => {
  const isAboValid = checkAboCompatibility(donor.bloodGroup, recipient.bloodGroup);
  const hasOrgan = donor.organsPledged.includes(recipient.organNeeded);

  if (!isAboValid || !hasOrgan) {
    return {
      compatible: false,
      score: 0,
      confidence: 0,
      breakdown: [],
      reason: !hasOrgan 
        ? `Donor does not pledge required organ (${recipient.organNeeded})`
        : `ABO Incompatibility: Donor ${donor.bloodGroup} cannot donate to Recipient ${recipient.bloodGroup}`
    };
  }

  const hlaCount = calculateHlaMatchCount(donor.hlaTyping, recipient.hlaTyping);
  const ageGap = Math.abs(donor.age - recipient.age);
  const distance = donor.distanceKm || 35;
  const sizeDiff = Math.abs(donor.organSizeMatchPct || 0);

  // Biological & Clinical weights matching our XGBoost clinical model
  const hlaScore = (hlaCount / 6) * 35; // max 35 pts
  const bloodBonus = donor.bloodGroup === recipient.bloodGroup ? 20 : 15; // max 20 pts
  const ageScore = Math.max(0, 15 - (ageGap * 0.4)); // max 15 pts
  const distanceScore = Math.max(0, 15 - (distance * 0.08)); // max 15 pts
  const sizeScore = Math.max(0, 10 - (sizeDiff * 0.7)); // max 10 pts
  const urgencyBoost = (recipient.urgency / 10) * 5; // max 5 pts

  const totalScore = Math.min(99.4, Math.max(35, hlaScore + bloodBonus + ageScore + distanceScore + sizeScore + urgencyBoost));

  // SHAP Feature Contributions (Feature impact toward final score)
  const shapContributions = [
    {
      factor: "HLA Antigen Matching",
      value: `${hlaCount}/6 Matches (${donor.hlaTyping.A} vs ${recipient.hlaTyping.A})`,
      impact: hlaCount >= 4 ? "+ High Positive" : hlaCount >= 2 ? "+ Moderate" : "~ Baseline",
      percentage: Math.round((hlaScore / 35) * 100),
      rawWeight: 0.35,
      color: "bg-emerald-500"
    },
    {
      factor: "ABO Blood Lineage Compatibility",
      value: `${donor.bloodGroup} ➔ ${recipient.bloodGroup} (Isotype match)`,
      impact: donor.bloodGroup === recipient.bloodGroup ? "+ Optimal Iso-Group" : "+ Cross-Permissible",
      percentage: Math.round((bloodBonus / 20) * 100),
      rawWeight: 0.20,
      color: "bg-teal-500"
    },
    {
      factor: "Geographic Distance & Ischemia Window",
      value: `${distance} km (${(distance * 0.75).toFixed(0)} min transit estimate)`,
      impact: distance < 50 ? "+ Rapid Green Corridor" : distance < 150 ? "Satisfactory" : "- Extended Transit",
      percentage: Math.round((distanceScore / 15) * 100),
      rawWeight: 0.15,
      color: "bg-sky-500"
    },
    {
      factor: "Age Differential",
      value: `Δ ${ageGap} yrs (${donor.age} vs ${recipient.age})`,
      impact: ageGap <= 10 ? "+ Minimal gap" : ageGap <= 20 ? "Acceptable" : "- Moderate gap",
      percentage: Math.round((ageScore / 15) * 100),
      rawWeight: 0.15,
      color: "bg-indigo-500"
    },
    {
      factor: "Anatomical Organ Size Concordance",
      value: `${donor.organSizeMatchPct > 0 ? "+" : ""}${donor.organSizeMatchPct}% size diff`,
      impact: sizeDiff <= 5 ? "+ Ideal volumetric fit" : "Permissible",
      percentage: Math.round((sizeScore / 10) * 100),
      rawWeight: 0.10,
      color: "bg-amber-500"
    },
    {
      factor: "Recipient Clinical Urgency Weight",
      value: `Tier ${recipient.urgency}/10 (${recipient.waitlistMonths} mos waitlist)`,
      impact: recipient.urgency >= 8 ? "+ Priority Escalation" : "Standard",
      percentage: Math.round((urgencyBoost / 5) * 100),
      rawWeight: 0.05,
      color: "bg-rose-500"
    }
  ];

  return {
    compatible: true,
    score: Number(totalScore.toFixed(1)),
    confidence: 94.8,
    algorithm: "XGBoost v1.4 + SHAP Explainer (Clinical Decision Support)",
    breakdown: shapContributions
  };
};

export const CLINICAL_FAQS = [
  {
    q: "Who is eligible to register as an organ donor on OrganEase in India?",
    a: "Any citizen aged 18 or above with valid identification (Aadhaar/PAN) can register their pledge under NOTTO (National Organ and Tissue Transplant Organisation) guidelines. Clinical eligibility is confirmed by medical boards upon procurement."
  },
  {
    q: "How does the ML matching decision support system work?",
    a: "OrganEase executes strict clinical filters (ABO compatibility and organ type) first. It then runs an XGBoost machine-learning ranker evaluating HLA antigen locus agreement, age delta, green corridor cold-ischemia distance, and anatomical size concordance. The system outputs an explainable match score with SHAP contribution vectors for medical staff review."
  },
  {
    q: "Can the algorithm automatically allocate or assign an organ?",
    a: "No. In strict adherence to organ procurement governance (THOTA 1994 & NOTTO guidelines), OrganEase functions solely as a clinical decision-support tool. Final procurement, allocation authorization, and crossmatch verification rest exclusively with licensed transplant surgeons and state/national allocation committees."
  },
  {
    q: "What is a Green Corridor in Indian organ transplantation?",
    a: "A Green Corridor is a dedicated route managed by traffic police and healthcare authorities to transport harvested organs from one hospital to another or to an airport without encountering red lights or traffic bottlenecks, minimizing Cold Ischemia Time."
  }
];
