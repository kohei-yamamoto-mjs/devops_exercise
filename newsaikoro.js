function main (){
  
    var PEOPLE = Number(document.getElementById('people').value);
    var PEOPLE_element = document.getElementById("easy");
     let items = document.querySelectorAll('li');
for (const item of items) {
	item.remove();
}
   
   console.log("-----------開始-----------");
            
      var SYUKEIcount =[0,0,0,0];
      var RESULT = [];
        
      for(var a = 1; a <= PEOPLE; a++)//人数分繰り返す 
       {
   console.log(a,"人目---------");
         var ATEAM = SAIKORO();
        var syukei = HANTEI(ATEAM);
        RESULT[a] = (`『${a}人目』🎲一回目:${ATEAM[1]} 🎲二回目:${ATEAM[2]} 🎲三回目:${ATEAM[3]} 🎲四回目:${ATEAM[4]}🎲五回目:${ATEAM[5]}::${syukei[4]}`);
        var person_result = document.createElement('li');
            person_result.className = 'people_list';
            person_result.textContent = RESULT[a];
            PEOPLE_element.appendChild(person_result);
          
   console.log("main ATEAM(合計,出目)",ATEAM);
   console.log("集計用配列",syukei);
        SYUKEIsum(SYUKEIcount,syukei);//a人目の結果を集計に足す
       }//人数分繰り返す 終了
   
      
         SYUKEIresult(SYUKEIcount);//集計を表示
   console.log("-----------終了-----------");
          
   }
   
   
   
   
   //関数1 サイコロ
   function SAIKORO()//inputからの情報を引数に取る(未実装)
   {    
    var MEN = 6;      
    var KAISUU = 5; 
    var sum =0;
    var TEAM = [];
    for(var i=1;i<=KAISUU;i++ )  //指定した回数繰り返す
     { 
      var SAIKORO = Math.floor( Math.random() * MEN )+ 1;//1から面の数までの中からランダムに引き当てる
       TEAM[i] = SAIKORO; //TEAMに格納(0番目を開けておく)
         sum += TEAM[i];//合計値を計算         
     }//サイコロ指定回数繰り返し 終わり
   
     TEAM[0]=sum;//0番目に合計を格納
           
   console.log("サイコロ関数内確認",TEAM);//コンソールに確認表示
    return TEAM;
   }
   
   
   
   
        //関数2 判定
   function HANTEI(TEAM)
      {
       var HENTAI = [0,0,0,0,0];
        //------------------------以下、場合分け------------------------------------------
        var first  = TEAM[1]==TEAM[2]&&TEAM[2]==TEAM[3]&&TEAM[3]==TEAM[4];
        var second = TEAM[2]==TEAM[3]&&TEAM[3]==TEAM[4]&&TEAM[4]==TEAM[5];
        var third  = TEAM[1]==TEAM[3]&&TEAM[3]==TEAM[4]&&TEAM[4]==TEAM[5];
        var forth  = TEAM[1]==TEAM[2]&&TEAM[2]==TEAM[4]&&TEAM[4]==TEAM[5];
        var fifth  = TEAM[1]==TEAM[2]&&TEAM[2]==TEAM[3]&&TEAM[3]==TEAM[5];
        var sum=TEAM[0];
        //-------------------------以下、場合分け終了--------------------------------------------
        
           //-------------------------------------------------------------------
        if ( sum == 5 )
         { 
          HENTAI[4] =("生涯ドリンク無料!"); 
           HENTAI[0] += 1;
         }    
         else if(first || second ||third || forth || fifth) 
         { 
          HENTAI[4] =("次回ドリンク代無料"); 
           HENTAI[1] += 1; 
         } 
         else if(sum%2==0) 
         { 
          HENTAI[4] =("半額！！");
           HENTAI[2] += 1; 
         } 
         else 
         { 
          HENTAI[4] =("メガジョッキサービス！！"); 
   
           HENTAI[3] += 1; 
         } 
        //console.log(HENTAI);
        return HENTAI;
      }//関数２　終わり
     
     //関数3 判定集計
   function SYUKEIsum(SYUUKEIcount,syukei){
    SYUUKEIcount[0]=SYUUKEIcount[0]+syukei[0]
    SYUUKEIcount[1]=SYUUKEIcount[1]+syukei[1]
    SYUUKEIcount[2]=SYUUKEIcount[2]+syukei[2]
    SYUUKEIcount[3]=SYUUKEIcount[3]+syukei[3]
    return SYUUKEIcount;
     }
     //関数4 集計結果
   function SYUKEIresult (SYUKEIcount) {
         
       var DRINK =     SYUKEIcount[0]; 
       var NEXTDRINK = SYUKEIcount[1]; 
       var HANGAKU =   SYUKEIcount[2];
       var MEGA =      SYUKEIcount[3]; 
       
   
          //コメント用変数//
      
      var resultD = ["出るわけないよ","わわお！今日からタダ飲み！帰り道は気を付けて！(0.012%)"];
      var resultND = ["残念","おめでとう次回のご来店お待ちしてます！"];
      var resultH = ["酒ばっか飲むな！","今日は素敵な日！もう一杯いかがですか？"];
      var resultG = ["👹はよ寝ろ！","おめでとう！飲んで忘れましょう！！"];
        
      var x = 0;
      var X = DRINK == 0 ?  x = 0 : x = 1;
    
      var y = 0;
      var Y = NEXTDRINK == 0 ?  y = 0 : y = 1;
      
      var z = 0;
      var Z = HANGAKU == 0 ?  z = 0 : z = 1;
      
      var a = 0;
      var A = MEGA == 0 ?  a = 0 : a = 1;
      
      document.getElementById("SYUUKEI1").textContent =("\n「集計出すよ!!」(⋈◍＞◡＜◍)。✧♡.\n.\n.");
      KEKKA =(`\n生涯ドリンク無料！(5回連続１が出る)\n${DRINK}人\n${resultD[x]}\n\n次回ドリンク代無料！！(５個の内4つぞろ目)\n${NEXTDRINK}人\n${resultND[y]}\n\n半額！！\n${HANGAKU}人\n${resultH[z]}\n\nメガジョッキ！！\n${MEGA}人\n${resultG[a]}`);
      document.getElementById("SYUUKEI2").textContent = KEKKA;
      //return KEKKA;
      console.log("生涯ドリンク無料",DRINK, "次回ドリンク無料",NEXTDRINK,"半額",HANGAKU,"メガジョッキ",MEGA);
        } 
