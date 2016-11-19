define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(n, t) {
    function e(n) {
        return n.phone && 1 === n.display && 1 === n.positionId && 1 === n.status && (n.realPhone = -1 != n.phone.indexOf(",") ? n.hostNumber + "," + n.extNumber: n.phone, n.showPhone = -1 != n.phone.indexOf(",") ? n.hostNumber + "转" + n.extNumber: n.phone),
        n
    }
    t.directive("firstContactAgent", ["$rootScope", "util",
    function(n, t) {
        return {
            restrict: "EA",
            scope: {
                agents: "=",
                putAwayText: "=",
                smsContent: "=",
                agentfrom: "@",
                houseid: "@"
            },
            template: '<div class="fixedagentcontact" ng-show="agent && agent.showPhone && putAwayText != \'off\'">                            <a class="contactlink" ng-click="jumpToAgentPage(agent)" href="javascript:;" >                                <div class="user-img">                                    <img ng-src="{{agent.avatar}}" onerror="javascript:this.src=\'/sh/static/images/common/agent_default.png\'">                                </div>                                <div class="user-info">                                    <p>{{agent.userName}}</p>                                    <p>{{agent.showPhone}}</p>                                </div>                            </a>                            <div class="contact_opera">                                <a class="sms" href="javascript:;" ng-click="sendSMS(agent.phoneNumber)" ng-show="agent.phoneNumber">                                    <p class="icon"></p>                                    <p>短信</p>                                </a>                                <a class="tel" href="tel:{{agent.realPhone}}" ng-click="trackOutboundLink()">                                    <p class="icon"></p>                                    <p>电话</p>                                </a>                            </div>                    </div>',
            link: function(a, o, i) {
                a.hostdomain = window.location.origin,
                a.jumpToAgentPage = function(n) {
                    window.location.href = a.hostdomain + "/jingjiren/detail/" + n.userCode + ".html?agentfrom=" + a.agentfrom + "&housesellid=" + a.houseid
                },
                a.$watch("agents",
                function(n) {
                    n && 0 !== n.length && (a.agent = e(n[0]))
                }),
                a.trackOutboundLink = function() {
                    n.trackOutboundLinkAllParam("agent", "contact", "tel")
                },
                a.sendSMS = function(e) {
                    n.trackOutboundLinkAllParam("agent", "contact", "msg"),
                    t.sendSMS(e, a.smsContent)
                }
            }
        }
    }]),
    t.directive("moreContactAgents", ["$rootScope", "$location", "util",
    function(n, t, a) {
        return {
            restrict: "EA",
            scope: {
                agents: "=",
                putAwayText: "=",
                smsContent: "=",
                agentfrom: "@",
                houseid: "@"
            },
            template: '<div class="p-list detai-list" ng-if="moreAgents.length > 0 && putAwayText != \'off\' && isLijikan == false">                            <h3>更多经纪人为您服务</h3>                            <ul class="moreagentbox">                                <li ng-repeat="agent in moreAgents" class="agentcontact moreagentcontact">                                    <a class="contactlink"  ng-click="jumpToAgentPage(agent)" href="javascript:;">                                        <div class="user-img">                                            <img ng-src="{{agent.avatar}}" onerror="javascript:this.src=\'/sh/static/images/common/agent_default.png\';" width="30">                                        </div>                                        <div class="user-info">                                            <p>{{agent.userName}}</p>                                            <p>{{agent.showPhone}}</p>                                        </div>                                    </a>                                    <div class="contact_opera">                                        <a class="sms" href="javascript:;" ng-click="sendSMS(agent.phoneNumber)" ng-show="agent.phoneNumber">                                            <p class="icon"></p>                                        </a>                                        <a class="tel" href="tel:{{agent.realPhone}}" ng-click="trackOutboundLink()">                                            <p class="icon"></p>                                        </a>                                    </div>                                </li>                            </ul>                    </div>',
            link: function(o, i, s) {
                o.hostdomain = window.location.origin,
                o.jumpToAgentPage = function(n) {
                    window.location.href = o.hostdomain + "/jingjiren/detail/" + n.userCode + ".html?agentfrom=" + o.agentfrom + "&housesellid=" + o.houseid
                },
                o.$watch("agents",
                function(n) { ! n || n.length <= 1 || (o.moreAgents = n.slice(1).map(function(n) {
                        return e(n)
                    }))
                }),
                o.trackOutboundLink = function() {
                    n.trackOutboundLinkAllParam("agent", "contact", "tel")
                },
                o.sendSMS = function(t) {
                    n.trackOutboundLinkAllParam("agent", "contact", "msg"),
                    a.sendSMS(t, o.smsContent)
                },
                o.isLijikan = !!t.search().aid
            }
        }
    }])
});