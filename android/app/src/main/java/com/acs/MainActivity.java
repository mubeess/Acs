package com.acs;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
 import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Acs";
  }
   @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        RNImmediatePhoneCallPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }  
  @Override
protected void onCreate(Bundle savedInstanceState) {
   SplashScreen.show(this);
  super.onCreate(null);
}
}
