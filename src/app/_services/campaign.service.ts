import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Campaign } from '../_models/campaign';

import { HttpService } from '../core/http.service';

import { AppStore } from '../app.store';

@Injectable()
export class CampaignService {

    // Redux based variables
    campaigns: Observable<Array<Campaign>>;

    campaignUrl = 'campaign';

    constructor(
        private http: HttpService,
        private store: Store<AppStore>
    ) { 
        this.campaigns = store.select( store => store.campaigns );
    }

    loadCampaigns() {
        return this.http.get(this.campaignUrl)
                        .map((res: Response) => {
                            console.log(res);
                            let body = res.json();
                            console.log(body);
                            return body.data || {};
                        })
                        .map((payload: Campaign[]) => {
                            console.log("Length: " + payload.length);
                            return { type: 'ADD_CAMPAIGNS', payload };
                        })
                        .subscribe((action) => {
                            console.log(action);
                            this.store.dispatch(action);
                        });
    }

    loadStaticCampaign()
    {
        let campainList : Campaign[];
        campainList = [
            {"name": "hfhfhf", "token": "eeeee", "totalBanners": 23, "activeBanners": 24 },
            {"name": "hdfhfhfhghhfg", "token": "csfffff", "totalBanners": 556, "activeBanners": 12 },
            {"name": "aaaaaa", "token": "iwiwkwoslls", "totalBanners": 76, "activeBanners": 86 }
        ];

        let action = {type: "ADD_STATIC", payload: campainList};
        console.log(action);
        this.store.dispatch(action);
    }

    hello()
    {
        console.info("Test");
    }

    removeSelectElement(element)
    {
        this.store.dispatch({type: "REMOVE_ELEMENT", payload: [element]})
    }
}