/// <reference types="@capacitor/cli" />

import type { PermissionState, PluginListenerHandle } from '@capacitor/core';

export type PresentationOption = 'badge' | 'sound' | 'alert';

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * On iOS you can configure the way the push notifications are displayed when the app is in foreground.
     */
    PushNotifications?: {
      /**
       * This is an array of strings you can combine. Possible values in the array are:
       *   - `badge`: badge count on the app icon is updated (default value)
       *   - `sound`: the device will ring/vibrate when the push notification is received
       *   - `alert`: the push notification is displayed in a native dialog
       *
       * An empty array can be provided if none of the options are desired.
       *
       * Only available for iOS.
       *
       * @since 1.0.0
       * @example ["badge", "sound", "alert"]
       */
      presentationOptions: PresentationOption[];
    };
  }
}

export interface PushNotificationsPlugin {
  /**
   * Register the app to receive push notifications.
   *
   * This method will trigger the `'registration'` event with the push token or
   * `'registrationError'` if there was a problem. It does prompt the user for
   * notification permissions, use `requestPermissions()` first.
   *
   * @since 1.0.0
   */
  register(): Promise<void>;

  /**
   * Get a list of notifications that are visible on the notifications screen.
   *
   * @since 1.0.0
   */
  getDeliveredNotifications(): Promise<DeliveredNotifications>;

  /**
   * Remove the specified notifications from the notifications screen.
   *
   * @since 1.0.0
   */
  removeDeliveredNotifications(
    delivered: DeliveredNotifications,
  ): Promise<void>;

  /**
   * Remove all the notifications from the notifications screen.
   *
   * @since 1.0.0
   */
  removeAllDeliveredNotifications(): Promise<void>;

  /**
   * Create a notification channel.
   *
   * Only available on Android O or newer (SDK 26+).
   *
   * @since 1.0.0
   */
  createChannel(channel: Channel): Promise<void>;

  /**
   * Delete a notification channel.
   *
   * Only available on Android O or newer (SDK 26+).
   *
   * @since 1.0.0
   */
  deleteChannel(channel: Channel): Promise<void>;

  /**
   * List the available notification channels.
   *
   * Only available on Android O or newer (SDK 26+).
   *
   * @since 1.0.0
   */
  listChannels(): Promise<ListChannelsResult>;

  /**
   * Check permission to receive push notifications.
   *
   * @since 1.0.0
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request permission to receive push notifications.
   *
   * @since 1.0.0
   */
  requestPermissions(): Promise<PermissionStatus>;

  /**
   * Signal to OS that background task completed.
   *
   */
   backgroundTaskCompleted(options: { result: 'failed' | 'noData' | 'newData' }): Promise<void>;

  /**
   * Called when the push notification registration finishes without problems.
   *
   * Provides the push notification token.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'registration',
    listenerFunc: (token: Token) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Called when the push notification registration finished with problems.
   *
   * Provides an error with the registration problem.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'registrationError',
    listenerFunc: (error: any) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Called when the device receives a push notification.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'pushNotificationReceived',
    listenerFunc: (notification: PushNotificationSchema) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Called when the device receives a background push notification.
   *
   */
   addListener(
    eventName: 'backgroundPushNotificationReceived',
    listenerFunc: (notification: PushNotificationSchema) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Called when an action is performed on a push notification.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'pushNotificationActionPerformed',
    listenerFunc: (notification: ActionPerformed) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Remove all native listeners for this plugin.
   *
   * @since 1.0.0
   */
  removeAllListeners(): Promise<void>;
}

export interface PushNotificationSchema {
  /**
   * The notification title.
   *
   * @since 1.0.0
   */
  title?: string;

  /**
   * The notification subtitle.
   *
   * @since 1.0.0
   */
  subtitle?: string;

  /**
   * The main text payload for the notification.
   *
   * @since 1.0.0
   */
  body?: string;

  /**
   * The notification identifier.
   *
   * @since 1.0.0
   */
  id: string;

  /**
   * The number to display for the app icon badge.
   *
   * @since 1.0.0
   */
  badge?: number;

  /**
   * @since 1.0.0
   */
  notification?: any;

  /**
   * @since 1.0.0
   */
  data: any;

  /**
   * @since 1.0.0
   */
  click_action?: string;

  /**
   * @since 1.0.0
   */
  link?: string;

  /**
   * Set the group identifier for notification grouping
   *
   * Only available on Android. Works like `threadIdentifier` on iOS.
   *
   * @since 1.0.0
   */
  group?: string;

  /**
   * Designate this notification as the summary for an associated `group`.
   *
   * Only available on Android.
   *
   * @since 1.0.0
   */
  groupSummary?: boolean;
}

export interface ActionPerformed {
  /**
   * @since 1.0.0
   */
  actionId: string;

  /**
   * @since 1.0.0
   */
  inputValue?: string;

  /**
   * @since 1.0.0
   */
  notification: PushNotificationSchema;
}

export interface Token {
  /**
   * @since 1.0.0
   */
  value: string;
}

export interface DeliveredNotifications {
  /**
   * @since 1.0.0
   */
  notifications: PushNotificationSchema[];
}

export interface Channel {
  /**
   * The channel identifier.
   *
   * @since 1.0.0
   */
  id: string;

  /**
   * The human-friendly name of this channel (presented to the user).
   *
   * @since 1.0.0
   */
  name: string;

  /**
   * The description of this channel (presented to the user).
   *
   * @since 1.0.0
   */
  description?: string;

  /**
   * The sound that should be played for notifications posted to this channel.
   *
   * Notification channels with an importance of at least `3` should have a
   * sound.
   *
   * The file name of a sound file should be specified relative to the android
   * app `res/raw` directory.
   *
   * @since 1.0.0
   * @example "jingle.wav"
   */
  sound?: string;

  /**
   * The level of interruption for notifications posted to this channel.
   *
   * @since 1.0.0
   */
  importance: Importance;

  /**
   * The visibility of notifications posted to this channel.
   *
   * This setting is for whether notifications posted to this channel appear on
   * the lockscreen or not, and if so, whether they appear in a redacted form.
   *
   * @since 1.0.0
   */
  visibility?: Visibility;

  /**
   * Whether notifications posted to this channel should display notification
   * lights, on devices that support it.
   *
   * @since 1.0.0
   */
  lights?: boolean;

  /**
   * The light color for notifications posted to this channel.
   *
   * Only supported if lights are enabled on this channel and the device
   * supports it.
   *
   * Supported color formats are `#RRGGBB` and `#RRGGBBAA`.
   *
   * @since 1.0.0
   */
  lightColor?: string;

  /**
   * Whether notifications posted to this channel should vibrate.
   *
   * @since 1.0.0
   */
  vibration?: boolean;
}

export type Importance = 1 | 2 | 3 | 4 | 5;
export type Visibility = -1 | 0 | 1;

export interface ListChannelsResult {
  /**
   * @since 1.0.0
   */
  channels: Channel[];
}

export interface PermissionStatus {
  /**
   * @since 1.0.0
   */
  receive: PermissionState;
}

/**
 * @deprecated Use 'Channel`.
 * @since 1.0.0
 */
export type NotificationChannel = Channel;

/**
 * @deprecated Use `ListChannelsResult`.
 * @since 1.0.0
 */
export type NotificationChannelList = ListChannelsResult;

/**
 * @deprecated Use `PushNotificationSchema`.
 * @since 1.0.0
 */
export type PushNotification = PushNotificationSchema;

/**
 * @deprecated Use `ActionPerformed`.
 * @since 1.0.0
 */
export type PushNotificationActionPerformed = ActionPerformed;

/**
 * @deprecated Use `DeliveredNotifications`.
 * @since 1.0.0
 */
export type PushNotificationDeliveredList = DeliveredNotifications;

/**
 * @deprecated Use `Token`.
 * @since 1.0.0
 */
export type PushNotificationToken = Token;
