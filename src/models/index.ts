interface User {
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
}

interface Company {
  [prop: string]: string
}

export interface UserInfo extends User {
  id: number,
  address: Address,
  company: Company,
}

export interface UserAvatar {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}
