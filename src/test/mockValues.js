export const MOCK_PERSONAL_USER = {
  "id":1,
  "name":"Jane Chan",
  "email":"jane.chan@example.com",
  "profile_picture_url":"https://placehold.co/600x400.png",
  "email_verified_at":"2022-01-01 15:38:33.0 Asia/Singapore (+08:00)",
  "identification_number":"S8****387A",
  "current_organisation":{
    "id":2,
    "name":"Hello World Bank",
    "logo_url":"https://placehold.co/600x400.png",
    "is_personal":true
  }
}

export const MOCK_MANAGED_USER = {
  "id":1,
  "name":"John Smith",
  "email":"john.smith@example.com",
  "profile_picture_url":"https://placehold.co/600x400.png",
  "email_verified_at":"2022-01-01 15:38:33.0 Asia/Singapore (+08:00)",
  "identification_number":"S9****567A",
  "current_organisation":{
    "id":2,
    "name":"Sample Bank ABC",
    "logo_url":"https://placehold.co/600x400.png",
    "is_personal":false
  }
}

export const MOCK_DOCUMENTS = [
  {
    "id": 1,
    "status": "issued",
    "document_name": "SWAB Test Result",
    "issuer_name": "ISSUER NAME",
    "issuer_logo_url": "https://placehold.co/600x400.png",
    "recipient_name": "John Frusciante",
    "received_on": "2022-01-12T17:58:25.000000Z",
    "expire_at": "2023-01-12T00:00:00.000000Z",
    "created_at": "2022-01-12T10:45:10.000000Z",
    "updated_at": "2022-01-12T17:58:25.000000Z",
    "archived_at": null,
    "deleted_at": null
  },
  {
    "id": 2,
    "status": "approved",
    "document_name": "SWAB Test Result",
    "issuer_name": "ISSUER NAME",
    "issuer_logo_url": "https://placehold.co/600x400.png",
    "recipient_name": "John Frusciante",
    "received_on": "2022-01-13T17:58:25.000000Z",
    "expire_at": null,
    "created_at": "2022-01-12T10:45:10.000000Z",
    "updated_at": "2022-01-12T17:58:25.000000Z",
    "archived_at": null,
    "deleted_at": null
  },
  {
    "id": 3,
    "status": "approved",
    "document_name": "SWAB Test Result",
    "issuer_name": "ISSUER NAME",
    "issuer_logo_url": "https://placehold.co/600x400.png",
    "recipient_name": "John Frusciante",
    "received_on": "2022-01-10T17:58:25.000000Z",
    "expire_at": null,
    "created_at": "2022-01-12T10:45:10.000000Z",
    "updated_at": "2022-01-12T17:58:25.000000Z",
    "archived_at": null,
    "deleted_at": null
  },
]