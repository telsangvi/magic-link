export class UserService {
    constructor() {
        console.log('User service initialized, you can connect to user database here')
    }

    async getUserFromEmail(query: string) {
        const result = [{email: 'abc@anymail.com', user_id: 1}, {
            email: 'efg@anymail.com',
            user_id: 2
        }].find(item => item.email === query);
        return result ? result : null;

    }
}