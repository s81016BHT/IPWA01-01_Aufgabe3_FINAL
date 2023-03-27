export interface Registration{
    type: String,
    address: Address | null,
    clothes: String[],
    areas: String[],
    date ?: String,
    time ?: String,
    registrationId ?: String
}

export interface Address{
    name: String,
    surname: String,
    street: String,
    number: Number,
    zipcode: Number,
    location: String
}

export interface RegistrationSearch{
    registrationId: Number
}

export interface CheckListItem{
    title: String,
    active: boolean
}