const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "airlibre-9c426",
  "private_key_id": "5bfb0507a78105d9df46cce52abdfe3214675736",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLxETsEwWj8LRh\nmPVlwyPptRBXX3ll8Z/p6Q4p3Uo86tXZSAsRckNf3WcqVn4KCJ5VpGAU5fouXlrf\npieV2cK3ZpjZQgWfQ/g5cRThhlWsst5m2v9Lrr6YwMCxkLESQcPKzofhM5CcHBMd\nPpSTVkL8qPQfsPO2zGxE9PkY3EpgPiGHvWHgJOPrexYT4O93GTXQ6KlCO/q+Srpt\npUb4xHRKx9m2qIUciKq4c5pwdOE4blkSlog4YlkqSV1ql5z2b6t4alp4S0agOLra\n6ORUKuf8ZCS0IGv5OHPZsLS4jV2/Kpca8F0Yrebg8q8rFSDLMZTbYq/dAk67+Vl8\nn+5EJTqXAgMBAAECggEAB4uY5cHhrM8w3Pk2A0gY51fFLlxpskhbceTumXGXhO6e\ni+oxzdaUjaiKYDQxQ7hLiRj75H+Me7wu70MrQvkmwTzsHndmLFdEUT7fuPVF7ONM\n8FAXBuZNf13faFdlKrnKQQUNCCU7cmOFhpAIkC5axG7K9S5Z64QoxqKvnG7VnHEc\nAQlv+I4pjNzCb9afC3zZ6Bl41tvAWQFobtdzbrpImafP8pKhZJONmVMXx36GhmCd\ntrFbEm1kg3veWreBgfvySF8MOfX4dJFfmlGCvXACKl2clAL044tKb+UZfrIH+Bwz\nRFHb5dycN9+6dAPdxjU8mNecBlMF5x0wl6+gMvmcOQKBgQD4kYTK0ERyKM8EGYX/\nVlZki3en2rZyOEyMumGrbNc56kWKVUg13Bs0OEIXGZj9fqYLDORkFfYEj5MZjaBD\nIf5dCrbWp358Ix19b2cxH84G2JsZEHDJwtVVsJ3EijwLU2eSKJg1W0VKtoy/Bw7D\nex8pnK7iIVtv2UxsbRB0dNtpfQKBgQDR29lVA7g63jgbAqvKYub7deo+NrAbHwCL\n+1Bmy20eBLaCv5Z87im+VCSY4RmuWLGRaMdMj1VRB919ORLNKRFXWZOSDkqYpAnW\n7Z8+INCtvRLY50igq8o654UedDOq+HGWobOpgonmshxFkUpJcw7mVNJZ4I50g5KY\npaAzwoJQowKBgQCtFY9VNo7iu13jqe4vrav82UzZuidfA6ryN3p5RxHbhzEjMV1V\n+82JoD8NHMr2gXEXssN6mfw0ktFIcuEMvigEG8jTUdB2mnEXfjJp946cH8poOpV/\nOMcaoyBI0kUbUdmF4fSS+toWO2VoQ37ZSeuaKztvxPCJwtM/kPZrUU/TdQKBgQCy\nbGETTt5L7rN1A4hbwkrwcQh/bK+931XvrfRl8X8MjqU99PZVsYf8Mj4LXRcgjHgs\nURFhnlvDURSXavb5R3le8uHsxAnYTV+wRMenYu8JSD/F+p5dPLHr8vvTMKjdK+4n\nS8Qc0se8RKKU4zptyE1at7NAhxOXLGZvMiJK3408UQKBgQDHPQ2OwcnqDOqWVJ7U\nnk2Hw9OUNPGdxArgCHiHxorJWBfvrgxi7JMCofAECSVQ0hYeub187eoThWOUGG7K\nWriS/xNpLheGEcJbiXa8fenvay+DiU/HA9aYX+jxkkdDBf+bM31x5epe+EIQeEIj\nLPXnJLn6F/LDlcVf/URitamqsg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-uzhn0@airlibre-9c426.iam.gserviceaccount.com",
  "client_id": "101195253470492641707",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uzhn0%40airlibre-9c426.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

// Initialisation de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://airlibre-9c426.firebaseio.com",
});
