
function onReceiverReady() {
  animationLoop();
}

function animationLoop() {

  var frequencies = [18600, 18800, 19000, 19200, 19400, 19600, 19800, 20000, 20200, 20400];

  var intensities = receiver.getIntensityValues(frequencies);
  var str = '';
  for (index in intensities)
    str += frequencies[index] + 'Hz -> ' + intensities[index] + 'db<br />';
  str += '<br />message: ' + message;

  document.getElementById('value').innerHTML = str;

  setTimeout(animationLoop, 100);
}

function onChangeMessage(m) {
  message = m;
}

var message;

var receiver = new Receiver(onReceiverReady, function(e) {console.log(e)});
receiver.initialize([18600, 18800, 19000, 19200, 19400, 19600, 19800, 20000], 20200, 20400);
receiver.onChangeMessage = onChangeMessage
