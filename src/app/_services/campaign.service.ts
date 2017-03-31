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
            {"name": this.createUUID(false), "token": this.createUUID(true), "totalBanners": 23, "activeBanners": 24 },
            {"name": this.createUUID(false), "token": this.createUUID(true), "totalBanners": 556, "activeBanners": 12 },
            {"name": this.createUUID(false), "token": this.createUUID(true), "totalBanners": 76, "activeBanners": 86 }
        ];

        let action = {type: "ADD_STATIC", payload: campainList};
        console.log(action);
        this.store.dispatch(action);
    }

    private  createUUID(withNumberAndChars) {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        if (!withNumberAndChars) hexDigits = "abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
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