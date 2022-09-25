//
//  BackgroundPushNotificationsHandler.swift
//  Plugin
//
//  Created by Manuel Jenni on 25.09.22.
//  Copyright © 2022 Max Lynch. All rights reserved.
//

import Capacitor

public final class BackgroundPushNotificationsHandler {
    public static let shared = BackgroundPushNotificationsHandler()
    public weak var plugin: CAPPlugin?
    private var completionHandler: ((UIBackgroundFetchResult) -> Void)?
    
    private init() {}
    
    public func didReceive(userInfo: [AnyHashable: Any], completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        self.completionHandler = completionHandler
        let data = [
            "data": JSTypes.coerceDictionaryToJSObject(userInfo) ?? [:]
        ]
        self.plugin?.notifyListeners("backgroundPushNotificationReceived", data: data)
    }
    
    public func taskCompleted(result: UIBackgroundFetchResult) {
        self.completionHandler?(result)
        self.completionHandler = nil
    }
}
