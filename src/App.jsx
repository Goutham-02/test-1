import One from './components/one.jsx'

function App() {

  return (
    <>
      <One topic={"Visiting Card"} text={
        `
<?xml version="1.0" encoding="utf-8"?> 
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android" 
xmlns:app="http://schemas.android.com/apk/res-auto" 
xmlns:tools="http://schemas.android.com/tools" 
android:layout_width="match_parent" 
android:layout_height="match_parent" 
android:background="#FFFFFF" 
tools:context=".MainActivity"> 
<TextView 
android:id="@+id/textView4" 
android:layout_width="371dp" 
android:layout_height="wrap_content" 
android:layout_alignParentStart="true" 
android:layout_alignParentLeft="true" 
android:layout_alignParentEnd="true" 
android:layout_alignParentRight="true" 
android:layout_alignParentBottom="true" 
android:layout_marginStart="28dp" 
android:layout_marginLeft="28dp" 
android:layout_marginEnd="12dp" 
android:layout_marginRight="12dp" 
android:layout_marginBottom="219dp" 
android:text="Address:ASKB Campus, Anandnagar, | Bangalore - 560 024" 
android:textAlignment="center" 
android:textSize="24sp" /> 
<TextView 
android:id="@+id/textView5" 
android:layout_width="250dp" 
android:layout_height="wrap_content" 
android:layout_alignParentStart="true" 
android:layout_alignParentLeft="true" 
android:layout_alignParentEnd="true" 
android:layout_alignParentRight="true" 
android:layout_alignParentBottom="true" 
android:layout_marginStart="87dp" 
android:layout_marginLeft="87dp" 
android:layout_marginEnd="73dp" 
android:layout_marginRight="73dp"
android:layout_marginBottom="157dp" 
android:text="Ph No: 9108380566" 
android:textAlignment="center" 
android:textSize="24sp" /> 
<TextView 
android:id="@+id/textView6" 
android:layout_width="367dp" 
android:layout_height="wrap_content" 
android:layout_alignParentStart="true" 
android:layout_alignParentLeft="true" 
android:layout_alignParentEnd="true" 
android:layout_alignParentRight="true" 
android:layout_alignParentBottom="true" 
android:layout_marginStart="25dp" 
android:layout_marginLeft="25dp" 
android:layout_marginEnd="19dp" 
android:layout_marginRight="19dp" 
android:layout_marginBottom="64dp" 
android:text="Email Id: uzma.sulthana@atria.edu" 
android:textAlignment="center" 
android:textSize="24sp" /> 
<TextView 
android:id="@+id/textView3" 
android:layout_width="367dp" 
android:layout_height="66dp" 
android:layout_alignParentStart="true" 
android:layout_alignParentLeft="true" 
android:layout_alignParentEnd="true" 
android:layout_alignParentRight="true" 
android:layout_alignParentBottom="true" 
android:layout_marginStart="32dp" 
android:layout_marginLeft="32dp" 
android:layout_marginEnd="12dp" 
android:layout_marginRight="12dp" 
android:layout_marginBottom="287dp" 
android:text="Assistant Professor-ISE" 
android:textAlignment="center" 
android:textSize="24sp" /> 
<ImageView 
android:id="@+id/imageView3" 
android:layout_width="155dp" 
android:layout_height="98dp" 
android:layout_alignParentEnd="true"
 android:layout_alignParentRight="true" 
        android:layout_alignParentBottom="true" 
        android:layout_marginEnd="12dp" 
        android:layout_marginRight="12dp" 
        android:layout_marginBottom="495dp" 
        app:srcCompat="@drawable/aitlogo" /> 
 
    <View 
        android:id="@+id/view" 
        android:layout_width="wrap_content" 
        android:layout_height="4dp" 
        android:layout_alignParentBottom="true" 
        android:layout_marginBottom="487dp" 
        android:background="#4444" /> 
 
    <TextView 
        android:id="@+id/textView2" 
        android:layout_width="176dp" 
        android:layout_height="wrap_content" 
        android:layout_alignParentStart="true" 
        android:layout_alignParentLeft="true" 
        android:layout_alignParentEnd="true" 
        android:layout_alignParentRight="true" 
        android:layout_alignParentBottom="true" 
        android:layout_marginStart="95dp" 
        android:layout_marginLeft="95dp" 
        android:layout_marginEnd="140dp" 
        android:layout_marginRight="140dp" 
        android:layout_marginBottom="401dp" 
        android:text="Uzma Sulthana" 
        android:textAlignment="center" 
        android:textSize="24sp" 
        android:textStyle="bold" /> 
 
    <TextView 
        android:id="@+id/textView7" 
        android:layout_width="wrap_content" 
        android:layout_height="wrap_content" 
        android:layout_alignParentBottom="true" 
        android:layout_marginEnd="99dp" 
        android:layout_marginRight="99dp" 
        android:layout_marginBottom="495dp" 
        android:layout_toStartOf="@+id/imageView3" 
        android:layout_toLeftOf="@+id/imageView3" 
        android:text="AIT" 
        android:textColor="#E91E63"
        android:textSize="36sp" 
android:textStyle="bold" /> 
</RelativeLayout> 
        `
      } />

      <One topic={"Calculator"} text={
        `
import androidx.appcompat.app.AppCompatActivity; 
import android.os.Bundle; 
import android.view.View; 
import android.widget.Button; 
import android.widget.EditText; 
import android.widget.TextView; 
public class MainActivity extends AppCompatActivity { 
EditText e1,e2; 
TextView tv; 
@Override 
protected void onCreate(Bundle savedInstanceState) { 
super.onCreate(savedInstanceState); 
setContentView(R.layout.activity_main); 
e1 =(EditText)findViewById(R.id.editText1); 
e2 = (EditText)findViewById(R.id.editText2); 
tv= (TextView)findViewById(R.id.tv1); 
} 
public void add(View v){ 
int a1=Integer.parseInt(e1.getText().toString()); 
int a2= Integer.parseInt(e2.getText().toString()); 
int result=a1+a2;
tv.setText(""+result); 
} 
public void sub(View v){ 
int a1=Integer.parseInt(e1.getText().toString()); 
int a2= Integer.parseInt(e2.getText().toString()); 
int result=a1-a2; 
tv.setText(""+result); 
} 
public void mul(View v){ 
int a1=Integer.parseInt(e1.getText().toString()); 
int a2= Integer.parseInt(e2.getText().toString()); 
int result=a1*a2; 
tv.setText(""+result); 
} 
public void div(View v){ 
float a1=Integer.parseInt(e1.getText().toString()); 
float a2= Integer.parseInt(e2.getText().toString()); 
float result=a1/a2; 
tv.setText(""+result); 
} 
}
        `
      } />
      <One topic={"Wallpaper"} text={
        `
package com.example.wallpaperchangeapplication; 
import androidx.appcompat.app.AppCompatActivity; 
import android.app.WallpaperManager; 
import android.graphics.Bitmap; 
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable; 
import android.graphics.drawable.Drawable; 
import android.os.Bundle; 
import android.os.Handler; 
import android.view.View; 
import android.widget.Button; 
import android.widget.Toast; 
import java.io.IOException; 
import java.util.Timer; 
import java.util.TimerTask; 
public class MainActivity extends AppCompatActivity { 
Button wallpaperChange; 
Timer mytimer; 
Drawable drawable; 
WallpaperManager wpm; 
int prev=1; 
@Override 
protected void onCreate(Bundle savedInstanceState) { 
super.onCreate(savedInstanceState); 
setContentView(R.layout.activity_main); 
mytimer=new Timer(); 
wpm = WallpaperManager.getInstance(this); 
wallpaperChange=(Button)findViewById(R.id.button1); 
wallpaperChange.setOnClickListener(new View.OnClickListener() { 
@Override public void onClick(View view) { 
setwallpaper(); 
} 
}); 
} 
private void setwallpaper() { 
Toast.makeText(this,"setting Wallpaper please wait.",Toast.LENGTH_LONG).show(); 
mytimer.schedule(new TimerTask() { 
@Override 
public void run() 
{ 
if(prev==1) { 
drawable = getResources().getDrawable(R.drawable.i1); prev = 2; 
} 
else if(prev==2) { 
drawable = getResources().getDrawable(R.drawable.i2); prev=3; 
}
else if(prev==3) { 
drawable = getResources().getDrawable(R.drawable.i3); prev=4; 
} 
else if(prev==4) { 
drawable = getResources().getDrawable(R.drawable.i4); prev=5; 
} 
else if(prev==5) { 
drawable = getResources().getDrawable(R.drawable.i5); prev=1; 
} 
Bitmap wallpaper = ((BitmapDrawable)drawable).getBitmap(); try { 
wpm.setBitmap(wallpaper); 
} 
catch (IOException e) 
{ e.printStackTrace(); 
} 
} 
},0,30000); 
} 
} 
        `
      } />

      <One topic={"Counter"} text={
        `
package com.example.counterapplication; 
import androidx.appcompat.app.AppCompatActivity; 
import android.os.Bundle; 
import android.os.Handler; 
import android.view.View; 
import android.widget.Button; 
import android.widget.TextView; 
public class MainActivity extends AppCompatActivity { 
TextView txtCounter; 
Button btn_start,btn_stop; 
int count=0; 
Handler customHandler=new Handler(); 
@Override 
protected void onCreate(Bundle savedInstanceState) { 
super.onCreate(savedInstanceState); 
setContentView(R.layout.activity_main); 
txtCounter= (TextView)findViewById(R.id.textView2); 
btn_start =(Button)findViewById(R.id.button1); 
btn_stop=(Button)findViewById(R.id.button2); 
btn_start.setOnClickListener(new View.OnClickListener() { 
@Override 
public void onClick(View v) { 
customHandler.postDelayed(updateTimerThread,0); 
} 
}); 
btn_stop.setOnClickListener(new View.OnClickListener() { 
@Override 
public void onClick(View v) { 
customHandler.removeCallbacks(updateTimerThread); 
} 
}); 
}
private final Runnable updateTimerThread =new Runnable() { 
@Override 
public void run() { 
txtCounter.setText(""+count); 
customHandler.postDelayed(this,1000); 
count++; 
} 
}; 
}
        `
      } />

      <One topic={"Text2Speech"} text={
        `
private final Runnable updateTimerThread =new Runnable() { 
@Override 
public void run() { 
txtCounter.setText(""+count); 
customHandler.postDelayed(this,1000); 
count++; 
} 
}; 
}
if(status!=TextToSpeech.ERROR){ 
t1.setLanguage(Locale.UK); 
} 
} 
}); 
} 
public void convert(View V){ 
String tospeak=e1.getText().toString(); 
t1.speak(tospeak,TextToSpeech.QUEUE_FLUSH,null); 
} 
}
        `
      } />
    </>
  )
}

export default App

