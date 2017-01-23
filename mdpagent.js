states = {};
var numstates = GameConfig.mdplevels * 4;
for (var i = 1; i <= numstates; i++) {
	states['s'+i] = {};
	states['s'+i].x = 151 + 125*((i-1)%4);
	states['s'+i].y = 400 - 100*Math.floor((i-1)/4);
	states['s'+i].val = 0;
}


// states.s1.x = 212.5;
// states.s1.y = 400;
// states.s1.val = 0;

// states.s2.x = 337.5;
// states.s2.y = 400;
// states.s2.val = 0;

// states.s3.x = 462.5;
// states.s3.y = 400;
// states.s3.val = 0;

// states.s4.x = 587.5;
// states.s4.y = 400;
// states.s4.val = 0;

// states.s5.x = 212.5;
// states.s5.y = 300;
// states.s5.val = 0;

// states.s6.x = 337.5;
// states.s6.y = 300;
// states.s6.val = 0;

// states.s7.x = 462.5;
// states.s7.y = 300;
// states.s7.val = 0;

// states.s8.x = 587.5;
// states.s8.y = 300;
// states.s8.val = 0;

function drawMDP(){
	var c=document.getElementById("canvas");
	var ctx=c.getContext("2d");
	
	for (var i = numstates; i >= 1; i--) {
		ctx.fillStyle = 'rgba(225,225,225,0.5)';
		ctx.fillRect(states['s'+i].x,states['s'+i].y,123,98);
		ctx.fillStyle = "red";
		ctx.fillText(states['s'+i].val.toFixed(2), states['s'+i].x, states['s'+i].y);
	}	
}

function resetMDP(){
	for (var i = numstates; i >= 1; i--) {
		states['s'+i].val = 0;
	}
}

function calculateMPD(currlane){
	var del=0;
	var err=10;
	for (var i = numstates; i > numstates-4; i--) {
		if(states['s'+i].val == 0){
			if(i%4 == currlane || currlane == 0)
				states['s'+i].val = 200;
			else
				states['s'+i].val = 100;
		}
	}
	for(var j=1; j<20; j++){
	// do{
		
		for (var i = numstates-4; i >= 1; i--) {
			
			if(states['s'+i].val != -100){
				var origVal = states['s'+i].val;
				if(i==1){
					states['s'+i].val = 0.1*states['s'+(i+1)].val + 0.9*states['s'+(i+4)].val;
				}
				else if(i==4){
					states['s'+i].val = 0.1*states['s'+(i-1)].val + 0.9*states['s'+(i+4)].val;
				}
				else{
					states['s'+i].val = 0.1*states['s'+(i-1)].val + 0.1*states['s'+(i+1)].val + 0.8*states['s'+(i+4)].val;
				}
				// states['s'+i].val = states['s'+(i+4)].val;
				// if(Math.abs(origVal-states['s'+i].val) > del) del = Math.abs(origVal-states['s'+i].val);
			}
			// console.log(del);
		}
	}
		// console.log(del);
	// } while(del>err);
}

