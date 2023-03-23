export interface Address{
    name: String,
    surname: String,
    street: String,
    number: String,
    zipcode: String,
    location: String
}

export interface Registration{
    type: String,
    address: Address | null,
    clothes: String[],
    areas: String[],
    date ?: String,
    time ?: String,
    registrationId ?: String
}

export interface CheckListItem{
    title: String,
    active: boolean
}