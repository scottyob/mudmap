// https://jsfiddle.net/jonobr1/Lbu6795r/87/

import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Two from "two.js";
import { ZUI } from "two.js/extras/jsm/zui.js";
import { GetMap } from "./Map.js";

function App() {

  useEffect(() => {
    let elem = document.getElementById('t');
    elem.innerHTML = '';

    var two = new Two({
      fullscreen: true,
      autostart: true
    }).appendTo(elem);

    var stage = new Two.Group();
    two.add(stage);

    let map = GetMap();

    const ROOM_SIZE = 100;
    const ROOM_OFFSET = 400;
    const getXY = (srcX, srcY, exit) => {
      switch (exit.dir) {
        case '1':
          return [srcX, srcY - ROOM_OFFSET]; //North
        case '2':
          return [srcX + ROOM_OFFSET, srcY]; //East
        case '3':
          return [srcX + ROOM_OFFSET, srcY - ROOM_OFFSET]; //North-East
        case '4':
          return [srcX, srcY + ROOM_OFFSET]; //South
        case '6':
          return [srcX + ROOM_OFFSET, srcY + ROOM_OFFSET]; // South-East
        case '8':
          return [srcX - ROOM_OFFSET, srcY]; // West
        case '9':
          return [srcX - ROOM_OFFSET, srcY - ROOM_OFFSET]; //North-West
        case '12':
          return [srcX - ROOM_OFFSET, srcY + ROOM_OFFSET]; //South-West
      };
      return null;
    }

    const renderRoom = (x, y, room) => {
      let roomIcon = new Two.Rectangle(x, y, ROOM_SIZE, ROOM_SIZE);
      stage.add(roomIcon);
      two.update();
      console.log(roomIcon.renderer);

      const mouseOver = () => {
        console.log(room.name);
      }

      roomIcon.renderer.elem.addEventListener('mouseover', mouseOver, false);

      if (room.symbol != "") {
        let txt = two.makeText(room.symbol, x, y);
        txt.scale = 10;
        stage.add(txt);
        two.update();
        txt.renderer.elem.addEventListener('mouseover', mouseOver, false);
      }
    }

    const DrawExit = (srcX, srcY, exit) => {
      let width = ROOM_OFFSET;
      let height = ROOM_OFFSET;
      let x = srcX;
      let y = srcY;
      if (['1', '4'].includes(exit.dir)) {
        // North or south
        width = ROOM_SIZE / 2;
        height = ROOM_OFFSET / 2;
      }
      if (exit.dir == '1') {
        y -= ROOM_SIZE;
      }
      if (exit.dir == '4') {
        y += ROOM_SIZE;
      }
      if (['2', '8'].includes(exit.dir)) {
        // East or West
        width = ROOM_OFFSET / 2;
        height = ROOM_SIZE / 2;
      }
      if (exit.dir == '2') {
        x += ROOM_SIZE; // East
      }
      if (exit.dir == '8') {
        x -= ROOM_SIZE; // West
      }
      if (['3', '6', '9', '12'].includes(exit.dir)) {
        let parent = new Two.Group();
        parent.position = new Two.Vector(x, y);
        let length = Math.sqrt((ROOM_OFFSET * ROOM_OFFSET) + (ROOM_OFFSET * ROOM_OFFSET)) / 2;
        let r = new Two.Rectangle(length / 2, 0, length, ROOM_SIZE / 2);
        parent.add(r);
        stage.add(parent);

        switch (exit.dir) {
          case '3':
            // North-east
            parent.rotation = -0.785398;
            break;
          case '6':
            // South-east
            parent.rotation = 0.785398;
            break;
          case '9':
            // North-west
            parent.rotation = 3.92699;
            break;
          case '12':
            // South-west
            parent.rotation = 2.35619;
            break;
        }
        return;
      }

      let rec = new Two.Rectangle(x, y, width, height);
      rec.fill = new Two.Texture("data:image/jpeg;base64,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");
      rec.fill.repeat = 'repeat';
      rec.fill.scale = new Two.Vector(.5, .5);
      stage.add(rec);
    };

    let toVisit = [
      [map['1'], 0, 0]
    ];

    const processed = new Set();
    while (toVisit.length > 0) {
      // Walk through each room in the map to discover

      let [room, srcX, srcY] = toVisit.pop();
      if (processed.has(room)) {
        continue;
      }

      // Add the new discovered room, and the location at which we want to draw it
      let alternativeExists = [];
      room.exits.forEach((exit) => {
        let dstLocation = getXY(srcX, srcY, exit);
        if (dstLocation !== null) {
          DrawExit(srcX, srcY, exit);
          let [newX, newY] = dstLocation;
          toVisit.push([map[exit.vnum], newX, newY]);
        } else {
          // This is a "Go-to" style room.
          alternativeExists.push(exit);
        }
      });

      if (room.flags != '4104') {
        // Draw the room
        renderRoom(srcX, srcY, room);
      }

      // Render the alternative exits found at this room
      if (alternativeExists.length > 0) {

        let roomContainer = two.makeRoundedRectangle(srcX + ROOM_SIZE + 25, srcY + ROOM_SIZE + 25, ROOM_OFFSET / 2, ROOM_OFFSET / 2);
        roomContainer.fill = 'gray';
        stage.add(roomContainer)
      }

      processed.add(room);
    }

    // let offset = 0;
    // const size = 100;
    // let roomIcon = new Two.Rectangle(0, 0, size, size);
    // stage.add(roomIcon);
    // let edge = new Two.Rectangle(size + size / 2, 0, size*2, size/2);
    // stage.add(edge);
    // edge = new Two.Rectangle(((offset * size) * 5) - (size + size / 2), 0, size*2, size/2);
    // stage.add(edge);

    // offset += 1;
    // roomIcon = new Two.Rectangle((offset * size) * 5, 0, size, size);
    // stage.add(roomIcon);
    // edge = new Two.Rectangle(((offset * size) * 5) + (size + size / 2), 0, size*2, size/2);
    // stage.add(edge);
    // edge = new Two.Rectangle(((offset * size) * 5) - (size + size / 2), 0, size*2, size/2);
    // stage.add(edge);

    // offset += 1;
    // roomIcon = new Two.Rectangle((offset * size) * 5, 0, size, size);
    // stage.add(roomIcon);
    // edge = new Two.Rectangle(((offset * size) * 5) + (size + size / 2), 0, size*2, size/2);
    // stage.add(edge);
    // edge = new Two.Rectangle(((offset * size) * 5) - (size + size / 2), 0, size*2, size/2);
    // stage.add(edge);

    // for (var i = 0; i < 100; i++) {
    //   var x = Math.random() * two.width * 2 - two.width;
    //   var y = Math.random() * two.height * 2 - two.height;
    //   var size = 50;
    //   let localShape = new Two.Rectangle(x, y, size, size);
    //   localShape.name = i;
    //   var shape = localShape;
    //   shape.rotation = Math.random() * Math.PI * 2;
    //   shape.noStroke().fill = '#ccc';
    //   stage.add(shape);
    //   two.update();
    //   shape._renderer.elem.addEventListener('click', (a, b, c) => {
    //     console.log(localShape.name);
    //     localShape.noStroke().fill = 'orange';
    //   }, false);
    // }

    // shape.fill = 'red';
    // shape.position.set(two.width / 2, two.height / 2);

    addZUI();

    function addZUI() {

      var domElement = two.renderer.domElement;
      var zui = new ZUI(stage);
      var mouse = new Two.Vector();
      var touches = {};
      var distance = 0;
      var dragging = false;

      zui.addLimits(0.06, 8);

      domElement.addEventListener('mousedown', mousedown, false);
      domElement.addEventListener('mousewheel', mousewheel, false);
      domElement.addEventListener('wheel', mousewheel, false);

      domElement.addEventListener('touchstart', touchstart, false);
      domElement.addEventListener('touchmove', touchmove, false);
      domElement.addEventListener('touchend', touchend, false);
      domElement.addEventListener('touchcancel', touchend, false);

      function mousedown(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        // var rect = shape.getBoundingClientRect();
        // dragging = mouse.x > rect.left && mouse.x < rect.right
        // && mouse.y > rect.top && mouse.y < rect.bottom;
        window.addEventListener('mousemove', mousemove, false);
        window.addEventListener('mouseup', mouseup, false);
      }

      function mousemove(e) {
        var dx = e.clientX - mouse.x;
        var dy = e.clientY - mouse.y;
        if (dragging) {
          // shape.position.x += dx / zui.scale;
          // shape.position.y += dy / zui.scale;
        } else {
          zui.translateSurface(dx, dy);
        }
        mouse.set(e.clientX, e.clientY);
      }

      function mouseup(e) {
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
      }

      function mousewheel(e) {
        var dy = (e.wheelDeltaY || - e.deltaY) / 1000;
        zui.zoomBy(dy, e.clientX, e.clientY);
      }

      function touchstart(e) {
        switch (e.touches.length) {
          case 2:
            pinchstart(e);
            break;
          case 1:
            panstart(e)
            break;
        }
      }

      function touchmove(e) {
        switch (e.touches.length) {
          case 2:
            pinchmove(e);
            break;
          case 1:
            panmove(e)
            break;
        }
      }

      function touchend(e) {
        touches = {};
        var touch = e.touches[0];
        if (touch) {  // Pass through for panning after pinching
          mouse.x = touch.clientX;
          mouse.y = touch.clientY;
        }
      }

      function panstart(e) {
        var touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
      }

      function panmove(e) {
        var touch = e.touches[0];
        var dx = touch.clientX - mouse.x;
        var dy = touch.clientY - mouse.y;
        zui.translateSurface(dx, dy);
        mouse.set(touch.clientX, touch.clientY);
      }

      function pinchstart(e) {
        for (var i = 0; i < e.touches.length; i++) {
          var touch = e.touches[i];
          touches[touch.identifier] = touch;
        }
        var a = touches[0];
        var b = touches[1];
        var dx = b.clientX - a.clientX;
        var dy = b.clientY - a.clientY;
        distance = Math.sqrt(dx * dx + dy * dy);
        mouse.x = dx / 2 + a.clientX;
        mouse.y = dy / 2 + a.clientY;
      }

      function pinchmove(e) {
        for (var i = 0; i < e.touches.length; i++) {
          var touch = e.touches[i];
          touches[touch.identifier] = touch;
        }
        var a = touches[0];
        var b = touches[1];
        var dx = b.clientX - a.clientX;
        var dy = b.clientY - a.clientY;
        var d = Math.sqrt(dx * dx + dy * dy);
        var delta = d - distance;
        zui.zoomBy(delta / 250, mouse.x, mouse.y);
        distance = d;
      }

    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="t"></div>
      </header>
    </div>
  );
}

export default App;
