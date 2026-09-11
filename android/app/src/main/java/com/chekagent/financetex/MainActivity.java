package com.chekagent.financetex;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private OnBackPressedCallback backCallback;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    backCallback = new OnBackPressedCallback(true) {
      @Override
      public void handleOnBackPressed() {
        handleListokBack();
      }
    };
    getOnBackPressedDispatcher().addCallback(this, backCallback);
  }

  /**
   * Системный жест не завершает Листок преждевременно: сначала закрываем
   * открытую шторку, затем возвращаемся по истории приложения. Если истории
   * уже нет, ведём на обзор; выйти можно только повторным жестом с обзора.
   */
  private void handleListokBack() {
    if (getBridge() == null || getBridge().getWebView() == null) {
      finish();
      return;
    }
    final WebView webView = getBridge().getWebView();
    webView.evaluateJavascript(
      "Boolean(document.querySelector('[role=dialog]'))",
      hasDialog -> {
        if ("true".equals(hasDialog)) {
          webView.evaluateJavascript("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}))", null);
          return;
        }
        webView.evaluateJavascript("window.history.length > 1", hasHistory -> {
          if ("true".equals(hasHistory)) {
            webView.evaluateJavascript("window.history.back()", null);
            return;
          }
          webView.evaluateJavascript("window.location.pathname", path -> {
            if (!"\"/\"".equals(path)) {
              webView.evaluateJavascript("window.dispatchEvent(new Event('listok:android-back-home'))", null);
            } else {
              backCallback.setEnabled(false);
              getOnBackPressedDispatcher().onBackPressed();
              backCallback.setEnabled(true);
            }
          });
        });
      }
    );
  }
}
