    /**
 *Componente de rotas
 * 
 */


 import React from   'react';
 import {Route,Switch} from 'react-router-dom';
 import HomePage from '../pages/home';
 import DetailPage from '../pages/detail'
 
 const  RouterX  = ()=>(
    <Switch>
        <Route exact component={HomePage} path="/"/>
        <Route eact component={DetailPage} path="/detail/:code"/>
    </Switch>
 )

 export default RouterX;