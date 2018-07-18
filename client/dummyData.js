export const patients = [{
  id: 1,
  name: 'Albus Dumbledore',
}, {
  id: 2,
  name: 'Luna Lovegood',
}, {
  id: 3,
  name: 'Fred Weasley',
}, {
  id: 4,
  name: 'Ginny Weasley',
}, {
  id: 5,
  name: 'Ron Weasley',
}];

export const patient = {
  id: 2,
  phone: '123-456-7890',
  email: 'luna@example.com',
  DOB: '06-23-1980',
  address: '1234 Vanilla Lane\nChicago, IL 60660',
};

export const pendingAppts = [{
  doctor_id: 1,
  id: 1,
  message: null,
  patient_id: 1,
  purpose: "I'd like you to take my temperature, please. Thank you.",
  datetime: 'Wednesday, January 8, 2020, 10:30 AM',
  status: 'pending',
}];

export const pastAppts = [{
  doctor_id: 1,
  id: 10,
  message: null,
  patient_id: 1,
  purpose: 'Regular check-up for Luna',
  datetime: 'Thursday, April 5, 2017, 1:30 PM',
  status: 'confirmed',
},
{
  doctor_id: 1,
  id: 11,
  message: null,
  patient_id: 1,
  purpose: "Luna's follow-up exam",
  datetime: 'Monday, January 22, 2018, 8:00 AM',
  status: 'confirmed',
}];

export const files = [{
  id: 31,
  name: 'Luna_Lovegood_health_history.pdf',
}];
