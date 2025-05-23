export interface UserStateT {
	authorized: boolean
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	street: string
	homeNumber: string
	postNumber: string
	city: string
	password: string
	orderNumber: string
	orderId: string
	deliveryType: 'delivery' | 'pickup'
}

const defaultUserState: UserStateT = {
	authorized: false,
	firstName: '',
	lastName: '',
	phoneNumber: '',
	email: '',
	street: '',
	homeNumber: '',
	postNumber: '',
	city: '',
	password: '',
	deliveryType: 'delivery',
	orderNumber: '',
	orderId: '',
}

export default defaultUserState
