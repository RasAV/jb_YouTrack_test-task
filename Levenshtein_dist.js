function solver() {

  var s1 = document.getElementsByClassName('task__input')[0].value; //taking first line
  var s2 = document.getElementsByClassName('task__input')[1].value; //taking second line



  var dist = new Array(s1.length+1); //array of distances
  var err = 0;

  for (var i = 0; i < dist.length; i++) {
    dist[i] = new Array(s2.length+1);
  }

  for (var i = 0; i <= s1.length; i++) {
    dist[i][0] = i;
  }
  for (var i = 0; i <= s2.length; i++) {
    dist[0][i] = i;
  }

  // filling the array in order to Levenshtein rool
  for (var i = 1; i <= s1.length; i++) {
    for (var j = 1; j <= s2.length; j++) {
      if (s1[i-1] == s2[j-1]) {
        dist[i][j] = dist[i-1][j-1];
      }
      else {
        dist[i][j] = Math.min(dist[i][j-1], dist[i-1][j], dist[i-1][j-1]) + 1;
      }

    }
  }
  // minimum distance
  err = dist[s1.length][s2.length];

  // create the new lines (with dashes)
  x = dist.length - 1
  y = dist[0].length - 1

  new_s1 = ""
  new_s2 = ""

  while (x + y != 0) {
    if (x > 0 && y > 0) {
      min = Math.min(dist[x-1][y], dist[x][y-1], dist[x-1][y-1]);
      if (dist[x][y-1] == min) {
        new_s1 = "-" + new_s1;
        new_s2 = s2[y-1] + new_s2;
        y -= 1;
      }
      else if (dist[x-1][y-1] == min) {
        new_s1 = s1[x-1] + new_s1;
        new_s2 = s2[y-1] + new_s2;
        x -= 1;
        y -= 1;
      }
      else if (dist[x-1][y] == min) {
        new_s2 = "-" + new_s2;
        new_s1 = s1[x-1] + new_s1;
        x -= 1;
      }

    }

    else if (x == 0 && y > 0) {
      new_s1 = "-" + new_s1;
      new_s2 = s2[y-1] + new_s2;
      y -= 1;
    }

    else if (y == 0) {
      new_s2 = "-" + new_s2;
      new_s1 = s1[x-1] + new_s1;
      x -= 1;
    }
  }

  //print the answer
  where = document.getElementsByClassName('task__ans')[0];
  var first = "<p class='inner'>" + err + "</p>"
  var second = "<p class='inner'>" + new_s1 + "</p>"
  var third = "<p class='inner'>" + new_s2 + "</p>"
  var ans = first + second + third;
  //ar ans = "<div class='inner'>" + first + second + third + "</div"
  // var ans = err + "<br>" + new_s1 + "<br>" + new_s2;
  where.innerHTML = ans;

}
