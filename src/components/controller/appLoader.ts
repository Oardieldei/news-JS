import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiKey = process.env.API_KEY;

        super(process.env.API_URL!, apiKey ? { apiKey } : {});
    }
}

export default AppLoader;
