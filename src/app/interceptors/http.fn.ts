import {
    HttpHandlerFn,
    HttpHeaders,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';

const getHeaders = (reqheaders: HttpHeaders): any => {
    let headers: any = {};
    return headers;
};
  
export const HttpTrafficInterceptorFn: HttpInterceptorFn = (
    req: any, // Use the custom interface type
    next: HttpHandlerFn
  ) => {
    // do you inject a client service? it goes like this
    // const loaderService = inject(LoaderService);
  
    if (req.url.indexOf('localdata') > -1) {
      // pass through
      return next(req);
    }
    console.log('url from interceptor', req.url);
  
    const adjustedReq = req.clone({
      url: req.url,
      setHeaders: getHeaders(req.headers)
    });
  
    return next(adjustedReq);
  };
  