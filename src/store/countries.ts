import {makeAutoObservable} from "mobx";
import {CountryInfo, getCountryByName} from "./api/apiService";

class Countries {
    countries: CountryInfo[];
    isLoadingCountries: boolean;
    error: string

    constructor() {
        makeAutoObservable(this);
        this.countries = [];
        this.isLoadingCountries = false;
        this.error = '';
    }

    async fetchCountries(name: string) {
        try {
            this.isLoadingCountries = true;
            this.countries = await getCountryByName(name);
            this.isLoadingCountries = false;
        } catch (e: any) {
            this.isLoadingCountries = false;
            this.error = e;
        }
    }
}

export default new Countries();
