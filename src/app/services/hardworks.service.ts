import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HardWorkDto} from '../models/hardwork-dto';
import {catchError} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {SnackService} from './snack.service';
import {Network} from '../models/network';
import {StaticValues} from '../static/static-values';

@Injectable({
    providedIn: 'root'
})
export class HardworksService {

    private apiEndpoint: string;
    private url = '/api/transactions';

    constructor(@Inject(APP_CONFIG) public config: AppConfig, private http: HttpClient, private snackService: SnackService) {
        this.apiEndpoint = config.apiEndpoint;
        console.log('apiEndpoint is: ' + this.apiEndpoint);
    }

    getHardWorkHistoryData(network: Network  = StaticValues.NETWORK_ETH): Observable<HardWorkDto[]> {
        return this.http.get<HardWorkDto[]>(this.apiEndpoint + `${this.url}/history/hardwork`).pipe(
            catchError(this.snackService.handleError<HardWorkDto[]>(`HardWork history`))
        );
    }

    getHWHistoryDataByRange(minBlock: number, maxBlock: number, network: Network  = StaticValues.NETWORK_ETH): Observable<HardWorkDto[]> {
        return this.http.get<HardWorkDto[]>(this.apiEndpoint + `${this.url}/history/hardwork?from=${minBlock}&to=${maxBlock}`).pipe(
            catchError(this.snackService.handleError<HardWorkDto[]>(`HardWork history`))
        );
    }

    getHardWorkHistoryDataByName(name: string, network: Network  = StaticValues.NETWORK_ETH): Observable<HardWorkDto[]> {
        return this.http.get<HardWorkDto[]>(this.apiEndpoint + `${this.url}/history/hardwork/` + name).pipe(
            catchError(this.snackService.handleError<HardWorkDto[]>(`HardWork history for ` + name))
        );
    }


    getLastHardWorks(network: Network  = StaticValues.NETWORK_ETH): Observable<HardWorkDto[]> {
        return this.http.get<HardWorkDto[]>(this.apiEndpoint + `${this.url}/last/hardwork`).pipe(
            catchError(this.snackService.handleError<HardWorkDto[]>(`last HardWork `))
        );
    }

    getPaginatedHardworkHistoryData(
        page_size: number = 10,
        page_number: number = 0,
        vault?: string,
        minAmount: number = 0,
        ordering: string = 'desc',
        network: Network  = StaticValues.NETWORK_ETH,):
        Observable<HardWorkDto[]> {
        return this.http.get<HardWorkDto[]>
        (`${this.apiEndpoint}/hardwork/pages` +
            `?pageSize=${page_size}`
            + `&page=${page_number}`
            + `${vault ? `&vault=${vault}` : ''}`
            + `&minAmount=${minAmount}`
            + `&ordering=${ordering}`
        )
            .pipe(
                catchError(this.snackService.handleError<HardWorkDto[]>('Hardwork paginated history')
                ));
    }



}
