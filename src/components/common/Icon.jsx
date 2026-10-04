import React from 'react';
import {
    Sparkles, Code2, Cloud, Compass, Workflow, Package, Bot, Database, LineChart, ScanEye,
    KeyRound, Building2, MessagesSquare, Plug, Zap, GitBranch, Search, PenTool, Hammer, Rocket,
    RefreshCw, Layers, ShieldCheck, TrendingDown, Handshake,
} from 'lucide-react';

// Content in constants.js refers to icons by name; this keeps that mapping in one place.
const ICONS = {
    Sparkles, Code2, Cloud, Compass, Workflow, Package, Bot, Database, LineChart, ScanEye,
    KeyRound, Building2, MessagesSquare, Plug, Zap, GitBranch, Search, PenTool, Hammer, Rocket,
    RefreshCw, Layers, ShieldCheck, TrendingDown, Handshake,
};

const Icon = ({ name, ...props }) => {
    const Component = ICONS[name] || Sparkles;
    return <Component aria-hidden="true" {...props} />;
};

export default Icon;
