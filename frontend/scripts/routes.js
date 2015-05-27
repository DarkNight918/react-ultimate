// IMPORTS =========================================================================================
import React from "react";

// Eager Components
import {Route, DefaultRoute, NotFoundRoute} from "react-router";
import {Body, About, Tech, Credits, NotFound} from "frontend/scripts/components/page";

// Lazy Components
//import {RobotIndex, RobotAdd, RobotDetail, RobotEdit} from "react-proxy!frontend/scripts/components/model/robot";
//import {MonsterIndex, MonsterAdd, MonsterDetail, MonsterEdit} from "react-proxy!frontend/scripts/components/model/monster";
// Not compatible. Check for React-Router to allow metadata passing!
import {RobotIndex, RobotAdd, RobotDetail, RobotEdit} from "frontend/scripts/components/model/robot";
import {MonsterIndex, MonsterAdd, MonsterDetail, MonsterEdit} from "frontend/scripts/components/model/monster";

// ROUTES ==========================================================================================
export default (
  <Route path="/" handler={Body}>
    <DefaultRoute name="about" handler={About}/>
    <Route path="/tech" name="tech" handler={Tech}/>
    <Route path="/credits" name="credits" handler={Credits}/>
    <NotFoundRoute handler={NotFound}/>

    <Route path="/robots/" name="robot-index" handler={RobotIndex}/>
    <Route path="/robots/add" name="robot-add" handler={RobotAdd}/>
    <Route path="/robots/:id" name="robot-detail" handler={RobotDetail}/>
    <Route path="/robots/:id/edit" name="robot-edit" handler={RobotEdit}/>

    <Route path="/monsters/" name="monster-index" handler={MonsterIndex}/>
    <Route path="/monsters/add" name="monster-add" handler={MonsterAdd}/>
    <Route path="/monsters/:id" name="monster-detail" handler={MonsterDetail}/>
    <Route path="/monsters/:id/edit" name="monster-edit" handler={MonsterEdit}/>
  </Route>
);
