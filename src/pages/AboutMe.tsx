
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutMe: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Me</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Who I Am</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to my programming memoir site. I'm a developer based in Germany 
            who works with various technologies including C#, Python, Blender, Unity, 
            and Meta Quest development.
          </p>
          <p>
            This site serves as my personal knowledge base where I document my 
            learnings, experiences, and solutions to problems I encounter in my 
            development journey.
          </p>
          <p>
            Feel free to explore my notes organized by categories and tags. I hope 
            you find something useful here!
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>My Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>C#:</strong> Backend development, desktop applications</li>
            <li><strong>Python:</strong> Data processing, automation, scripting</li>
            <li><strong>Blender:</strong> 3D modeling, animation, texturing</li>
            <li><strong>Unity:</strong> Game development, interactive experiences</li>
            <li><strong>Meta Quest:</strong> Virtual reality development</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutMe;
