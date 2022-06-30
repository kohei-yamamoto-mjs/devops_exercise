function rotateSaikoro(){
  var btnSwitch = document.getElementById('btn');
  if (btnSwitch.textContent == 'start'){
    document.getElementById('space').style.display = 'inline';
    
  let items = document.querySelectorAll('li');
  for (const item of items) {item.remove();}//li 初期化
    btnSwitch.textContent = 'stop';
    
  }else{
    btnSwitch.textContent = 'start';
    document.getElementById('space').style.display = 'none';
    console.log(btnSwitch);
    main();
  }
 }







function main (){
  
  var PEOPLE = Number(document.getElementById('people').value);
  var MEN = Number(document.getElementById('MEN').value);
  var KAISU = Number(document.getElementById('KAISU').value);
  var PEOPLE_element = document.getElementById("PEOPLE_element");
  var SYUUKEI1 = document.getElementById("SYUUKEI1");
  var SYUUKEI2 =document.getElementById("SYUUKEI2");
  SYUUKEI1.textContent=""
  SYUUKEI2.textContent=""
  
  var DRINKlist =[];
  var NEXTDRINKlist =[];
  //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓例外処理↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
  if (PEOPLE<0 || PEOPLE >= 55000)
     {
      alert("1~55000を入力してください");
      var x = document.getElementById("SYUUKEI1");
          x.innerHTML = "55000は東京ドームの収容人数";
      var y = document.getElementById("SYUUKEI2");
          y.innerHTML = "";
          return;//強制終了
     }
   else if(PEOPLE ===0)PEOPLE=1;
  
     console.log(MEN,"入力された🎲面---------");
  MEN === 0?     MEN=6 :MEN=MEN;//面デフォルト設定
    console.log(KAISU,"入力された🎲回数---------");
  KAISU ===0? KAISU=5 :KAISU=KAISU;//回数デフォルト設定
  if(MEN<0 || MEN>100)
  {alert("面は1～100で入力してください");return;}
  
  if(KAISU<0 || KAISU>100)
  {alert("🎲回数は1～100で入力してください");return;}
  
  //↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑例外処理↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑//
  
  
  console.log("-----------開始-----------");
              
        var SYUKEIcount =[0,0,0,0];
        var RESULT = [];
  //---------------------------一人モード--------------------------------------------------
        if(PEOPLE===1)
        {
          var ATEAM = SAIKORO(MEN,KAISU);//サイコロを指定回数分振って結果をATEAMとして取得
          var syukei = HANTEI(ATEAM);//ATEAMを使って判定をし、syukeiとして取得
          RESULT[0]=syukei[4];
         for(var i = 1; i <= KAISU; i++){
          console.log(i,"回目");
          RESULT[i]=`🎲${i}回目:${ATEAM[i]}`;//テキストを指定
          var SAIKORO_result = document.createElement('li');//li要素作成
          SAIKORO_result.className = 'SAIKORO_list';//クラスを指定
          SAIKORO_result.textContent = RESULT[i];//テキストを指定
           PEOPLE_element.appendChild(SAIKORO_result);//配置場所を指定
          console.log(RESULT[i]);
         }
         SYUUKEI2.innerHTML=(RESULT[0]);
              return;//強制終了
        };
  
  
        
        for(var a = 1; a <= PEOPLE; a++)//人数分繰り返す 
        {
     console.log(a,"人目---------");
           var ATEAM = SAIKORO(MEN,KAISU);//サイコロを指定回数分振って結果をATEAMとして取得
           var syukei = HANTEI(ATEAM);//ATEAMを使って判定をし、syukeiとして取得
               syukei[0] == 1 ?  DRINKlist.push(a): DRINK = 0;//生涯無料ならばその人数を記録する
               syukei[1] == 1 ?  NEXTDRINKlist.push(a) : NEXTDRINK = 0;//次回ドリンク無料ならばその人数を記録する
           //------------------------------------------------------------------------------------------------
           //----------------RESULT[a](a人目の表示)= "a人目"+("i回目:i回目の🎲")+"判定結果"　という仕組み--------
               RESULT[a] = (`『${a}人目』`);
               for(var i=1; i<=KAISU;i++) { RESULT[a]+=(`🎲${i}回目:${ATEAM[i]}`);}
               RESULT[a]+=( `::${syukei[4]}`);
           //--------------------------------------------------------------------------------------------------
  
          var person_result = document.createElement('li');//li要素作成
              person_result.className = 'people_list';//クラスを指定
              person_result.textContent = RESULT[a];//テキストを指定
              PEOPLE_element.appendChild(person_result);//配置場所を指定
            
     console.log("集計用ID配列",syukei);
          SYUKEIsum(SYUKEIcount,syukei);//a人目の結果を集計に足す
         }//人数分繰り返す 終了
  
        
           SYUKEIresult(SYUKEIcount);//集計をだすよ
           SYUKEIresult2(DRINKlist,NEXTDRINKlist);//当選者参照するよ
           
     console.log("-----------終了-----------");
  
     }
     
     
     
     
     //関数1 サイコロ
     function SAIKORO(MEN,KAISUU)//inputからの情報を引数に取る(未実装)
     {    
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
         var HENTAI = [0,0,0,0,0];//0:生涯カウント1:次回カウント2:半額カウント3:メガジョッキカウント4
          //------------------------以下、場合分け------------------------------------------
          var first  = TEAM[1]==TEAM[2]&&TEAM[2]==TEAM[3]&&TEAM[3]==TEAM[4];
          var second = TEAM[2]==TEAM[3]&&TEAM[3]==TEAM[4]&&TEAM[4]==TEAM[5];
          var third  = TEAM[1]==TEAM[3]&&TEAM[3]==TEAM[4]&&TEAM[4]==TEAM[5];
          var forth  = TEAM[1]==TEAM[2]&&TEAM[2]==TEAM[4]&&TEAM[4]==TEAM[5];
          var fifth  = TEAM[1]==TEAM[2]&&TEAM[2]==TEAM[3]&&TEAM[3]==TEAM[5];
          var sum=TEAM[0];
          //-------------------------以上、場合分け終了--------------------------------------------
          
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
        DRINK == 0 ?  x = 0 : x = 1;
      
        var y = 0;
        NEXTDRINK == 0 ?  y = 0 : y = 1;
        
        var z = 0;
        HANGAKU == 0 ?  z = 0 : z = 1;
        
        var a = 0;
        MEGA == 0 ?  a = 0 : a = 1;
  
        document.getElementById("SYUUKEI1").textContent =("\n「集計出すよ!!」(⋈◍＞◡＜◍)。✧♡.\n.\n.");
        KEKKA =(`生涯ドリンク無料!(5回連続1が出る)${DRINK}人${resultD[x]}\n\n次回ドリンク代無料!!(5個の内4つぞろ目)\n${NEXTDRINK}人\n${resultND[y]}\n\n半額！！\n${HANGAKU}人\n${resultH[z]}\n\nメガジョッキ！！\n${MEGA}人\n${resultG[a]}`);
        document.getElementById("SYUUKEI2").textContent = KEKKA;
        //return KEKKA;
        console.log("生涯ドリンク無料",DRINK, "次回ドリンク無料",NEXTDRINK,"半額",HANGAKU,"メガジョッキ",MEGA);
     }
  
     function SYUKEIresult2(list1,list2){
      document.getElementById("SYUUKEI2-2").textContent = (list1);
      document.getElementById("SYUUKEI2-3").textContent = (list2);
     }
  
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
     function option() {
     var optionArea = document.getElementById('optionArea')
      if (optionArea.style.display == 'inline'){
        // btn_1を非表示
        document.getElementById('optionArea').style.display = 'none'
        
      }
      else{
        // btn_1を表示
        document.getElementById('optionArea').style.display = 'inline'
      }
    }

   
  
