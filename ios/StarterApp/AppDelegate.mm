#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNBootSplash.h" // Splash screen
#import "RNhotupdate.h"  // OTA hot update
#import <GoogleMaps/GoogleMaps.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"StarterApp";
  self.initialProps = @{};
  [GMSServices provideAPIKey:@"AIzaSyCmYtIFIyNsdNtMTyRSUxVbH6hQX7l80jA"];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
                          moduleName:(NSString *)moduleName
                           initProps:(NSDictionary *)initProps
{
  UIView *rootView = [super createRootViewWithBridge:bridge moduleName:moduleName initProps:initProps];
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];
  return rootView;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}


- (void)applicationWillResignActive:(UIApplication *)application {
   if (self.taskIdentifier != UIBackgroundTaskInvalid) {
      [application endBackgroundTask:self.taskIdentifier];
      self.taskIdentifier = UIBackgroundTaskInvalid;
   }
 
   __weak AppDelegate *weakSelf = self;
   self.taskIdentifier = [application beginBackgroundTaskWithName:nil expirationHandler:^{
      if (weakSelf) {
          [application endBackgroundTask:weakSelf.taskIdentifier];
          weakSelf.taskIdentifier = UIBackgroundTaskInvalid;
      }
   }];
}


- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [RNhotupdate getBundle]; // Hot update release bundle
#endif
}



@end
