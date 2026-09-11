package com.chekagent.financetex;

import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
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
    openVkCallbackInWebView(getIntent());
    backCallback = new OnBackPressedCallback(true) {
      @Override
      public void handleOnBackPressed() {
        handleListokBack();
      }
    };
    getOnBackPressedDispatcher().addCallback(this, backCallback);
  }

  /**
   * VK ID завершает вход на HTTPS-callback. Android App Link доставляет его в
   * уже открытую WebView, чтобы сессионная cookie сохранилась в приложении, а
   * не в отдельном браузере.
   */
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    openVkCallbackInWebView(intent);
  }

  private void openVkCallbackInWebView(Intent intent) {
    if (intent == null || getBridge() == null || getBridge().getWebView() == null) return;
    final Uri uri = intent.getData();
    if (uri == null
      || !"https".equals(uri.getScheme())
      || !"financetex.relaxdev.ru".equals(uri.getHost())
      || uri.getPath() == null
      || !uri.getPath().startsWith("/api/auth/callback/vk")) return;

    final WebView webView = getBridge().getWebView();
    // Ждём готовности BridgeActivity: иначе URL из холодного старта может
    // быть перезаписан стартовой страницей Capacitor.
    webView.postDelayed(() -> webView.loadUrl(uri.toString()), 120);
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
