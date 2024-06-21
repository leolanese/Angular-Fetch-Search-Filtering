// example local http interceptor function

import {
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
  } from '@angular/common/http';
import { inject } from '@angular/core';
  
  export const LocalInterceptorFn: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ) => {
    // do you have a token provided by SSR ExpressEngine? use this
    // const serverUrl = inject(<any>'serverUrl', {optional: true});
  
    if (req.url.indexOf('localdata') < 0) {
      return next(req);
    }
    // do something with url, then handle
    let url = req.url;
  
    console.log('url from local interceptor', url);
  
    const adjustedReq = req.clone({ url: url });
  
    return next(adjustedReq);
  };
  