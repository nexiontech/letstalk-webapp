#!/bin/bash

# Blog Images Download Script
# Downloads all municipal services images for Let's Talk blog

echo "🖼️ Downloading municipal services blog images..."

# Create image directories
mkdir -p public/images/blog/featured
mkdir -p public/images/blog/content
mkdir -p public/images/blog/categories
mkdir -p public/images/blog/municipal
mkdir -p public/images/blog/community
mkdir -p public/images/blog/technology

# Download blog_municipal_revolution-1.jpg
echo "Downloading blog_municipal_revolution-1.jpg..."
curl -L "https://images.pexels.com/photos/15448152/pexels-photo-15448152.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_municipal_revolution-1.jpg"
sleep 1

# Download blog_municipal_revolution-2.jpg
echo "Downloading blog_municipal_revolution-2.jpg..."
curl -L "https://images.pexels.com/photos/30130073/pexels-photo-30130073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_municipal_revolution-2.jpg"
sleep 1

# Download blog_municipal_revolution-3.jpg
echo "Downloading blog_municipal_revolution-3.jpg..."
curl -L "https://images.pexels.com/photos/27501346/pexels-photo-27501346.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_municipal_revolution-3.jpg"
sleep 1

# Download blog_bela_bela_success-1.jpg
echo "Downloading blog_bela_bela_success-1.jpg..."
curl -L "https://images.pexels.com/photos/32342294/pexels-photo-32342294.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_bela_bela_success-1.jpg"
sleep 1

# Download blog_bela_bela_success-2.jpg
echo "Downloading blog_bela_bela_success-2.jpg..."
curl -L "https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_bela_bela_success-2.jpg"
sleep 1

# Download blog_bela_bela_success-3.jpg
echo "Downloading blog_bela_bela_success-3.jpg..."
curl -L "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_bela_bela_success-3.jpg"
sleep 1

# Download blog_digital_guide-1.jpg
echo "Downloading blog_digital_guide-1.jpg..."
curl -L "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_digital_guide-1.jpg"
sleep 1

# Download blog_digital_guide-2.jpg
echo "Downloading blog_digital_guide-2.jpg..."
curl -L "https://images.pexels.com/photos/5081930/pexels-photo-5081930.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_digital_guide-2.jpg"
sleep 1

# Download blog_digital_guide-3.jpg
echo "Downloading blog_digital_guide-3.jpg..."
curl -L "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_digital_guide-3.jpg"
sleep 1

# Download blog_technology_transformation-1.jpg
echo "Downloading blog_technology_transformation-1.jpg..."
curl -L "https://images.pexels.com/photos/7103167/pexels-photo-7103167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_technology_transformation-1.jpg"
sleep 1

# Download blog_technology_transformation-2.jpg
echo "Downloading blog_technology_transformation-2.jpg..."
curl -L "https://images.pexels.com/photos/7103147/pexels-photo-7103147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_technology_transformation-2.jpg"
sleep 1

# Download blog_technology_transformation-3.jpg
echo "Downloading blog_technology_transformation-3.jpg..."
curl -L "https://images.pexels.com/photos/7103164/pexels-photo-7103164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_technology_transformation-3.jpg"
sleep 1

# Download blog_community_stories-1.jpg
echo "Downloading blog_community_stories-1.jpg..."
curl -L "https://images.pexels.com/photos/12429856/pexels-photo-12429856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_community_stories-1.jpg"
sleep 1

# Download blog_community_stories-2.jpg
echo "Downloading blog_community_stories-2.jpg..."
curl -L "https://images.pexels.com/photos/28102680/pexels-photo-28102680.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_community_stories-2.jpg"
sleep 1

# Download blog_community_stories-3.jpg
echo "Downloading blog_community_stories-3.jpg..."
curl -L "https://images.pexels.com/photos/30616675/pexels-photo-30616675.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/featured/blog_community_stories-3.jpg"
sleep 1

# Download municipal_buildings-1.jpg
echo "Downloading municipal_buildings-1.jpg..."
curl -L "https://images.pexels.com/photos/15434151/pexels-photo-15434151.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/municipal_buildings-1.jpg"
sleep 1

# Download municipal_buildings-2.jpg
echo "Downloading municipal_buildings-2.jpg..."
curl -L "https://images.pexels.com/photos/19867355/pexels-photo-19867355.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/municipal_buildings-2.jpg"
sleep 1

# Download municipal_buildings-3.jpg
echo "Downloading municipal_buildings-3.jpg..."
curl -L "https://images.pexels.com/photos/10880680/pexels-photo-10880680.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/municipal_buildings-3.jpg"
sleep 1

# Download municipal_buildings-4.jpg
echo "Downloading municipal_buildings-4.jpg..."
curl -L "https://images.pexels.com/photos/5826001/pexels-photo-5826001.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/municipal_buildings-4.jpg"
sleep 1

# Download municipal_buildings-5.jpg
echo "Downloading municipal_buildings-5.jpg..."
curl -L "https://images.pexels.com/photos/6460886/pexels-photo-6460886.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/municipal_buildings-5.jpg"
sleep 1

# Download digital_services-1.jpg
echo "Downloading digital_services-1.jpg..."
curl -L "https://images.pexels.com/photos/2228574/pexels-photo-2228574.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_services-1.jpg"
sleep 1

# Download digital_services-2.jpg
echo "Downloading digital_services-2.jpg..."
curl -L "https://images.pexels.com/photos/16094052/pexels-photo-16094052.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_services-2.jpg"
sleep 1

# Download digital_services-3.jpg
echo "Downloading digital_services-3.jpg..."
curl -L "https://images.pexels.com/photos/4132538/pexels-photo-4132538.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_services-3.jpg"
sleep 1

# Download digital_services-4.jpg
echo "Downloading digital_services-4.jpg..."
curl -L "https://images.pexels.com/photos/16125027/pexels-photo-16125027.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_services-4.jpg"
sleep 1

# Download digital_services-5.jpg
echo "Downloading digital_services-5.jpg..."
curl -L "https://images.pexels.com/photos/16380906/pexels-photo-16380906.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_services-5.jpg"
sleep 1

# Download digital_services-6.jpg
echo "Downloading digital_services-6.jpg..."
curl -L "https://images.pexels.com/photos/16629436/pexels-photo-16629436.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_services-6.jpg"
sleep 1

# Download community_engagement-1.jpg
echo "Downloading community_engagement-1.jpg..."
curl -L "https://images.pexels.com/photos/5710922/pexels-photo-5710922.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/community/community_engagement-1.jpg"
sleep 1

# Download community_engagement-2.jpg
echo "Downloading community_engagement-2.jpg..."
curl -L "https://images.pexels.com/photos/5711372/pexels-photo-5711372.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/community/community_engagement-2.jpg"
sleep 1

# Download community_engagement-3.jpg
echo "Downloading community_engagement-3.jpg..."
curl -L "https://images.pexels.com/photos/5711000/pexels-photo-5711000.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/community/community_engagement-3.jpg"
sleep 1

# Download community_engagement-4.jpg
echo "Downloading community_engagement-4.jpg..."
curl -L "https://images.pexels.com/photos/4921082/pexels-photo-4921082.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/community/community_engagement-4.jpg"
sleep 1

# Download infrastructure-1.jpg
echo "Downloading infrastructure-1.jpg..."
curl -L "https://images.pexels.com/photos/16114927/pexels-photo-16114927.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/infrastructure-1.jpg"
sleep 1

# Download infrastructure-2.jpg
echo "Downloading infrastructure-2.jpg..."
curl -L "https://images.pexels.com/photos/2783232/pexels-photo-2783232.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/infrastructure-2.jpg"
sleep 1

# Download infrastructure-3.jpg
echo "Downloading infrastructure-3.jpg..."
curl -L "https://images.pexels.com/photos/29188577/pexels-photo-29188577.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/infrastructure-3.jpg"
sleep 1

# Download infrastructure-4.jpg
echo "Downloading infrastructure-4.jpg..."
curl -L "https://images.pexels.com/photos/6345100/pexels-photo-6345100.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/infrastructure-4.jpg"
sleep 1

# Download infrastructure-5.jpg
echo "Downloading infrastructure-5.jpg..."
curl -L "https://images.pexels.com/photos/30278399/pexels-photo-30278399.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/infrastructure-5.jpg"
sleep 1

# Download technology_solutions-1.jpg
echo "Downloading technology_solutions-1.jpg..."
curl -L "https://images.pexels.com/photos/9301298/pexels-photo-9301298.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/technology_solutions-1.jpg"
sleep 1

# Download technology_solutions-2.jpg
echo "Downloading technology_solutions-2.jpg..."
curl -L "https://images.pexels.com/photos/7792771/pexels-photo-7792771.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/technology_solutions-2.jpg"
sleep 1

# Download technology_solutions-3.jpg
echo "Downloading technology_solutions-3.jpg..."
curl -L "https://images.pexels.com/photos/7103167/pexels-photo-7103167.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/technology_solutions-3.jpg"
sleep 1

# Download technology_solutions-4.jpg
echo "Downloading technology_solutions-4.jpg..."
curl -L "https://images.pexels.com/photos/1181563/pexels-photo-1181563.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/technology_solutions-4.jpg"
sleep 1

# Download technology_solutions-5.jpg
echo "Downloading technology_solutions-5.jpg..."
curl -L "https://images.pexels.com/photos/7103147/pexels-photo-7103147.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/technology_solutions-5.jpg"
sleep 1

# Download technology_solutions-6.jpg
echo "Downloading technology_solutions-6.jpg..."
curl -L "https://images.pexels.com/photos/6829539/pexels-photo-6829539.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/technology_solutions-6.jpg"
sleep 1

# Download water_services-1.jpg
echo "Downloading water_services-1.jpg..."
curl -L "https://images.pexels.com/photos/25311203/pexels-photo-25311203.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/water_services-1.jpg"
sleep 1

# Download water_services-2.jpg
echo "Downloading water_services-2.jpg..."
curl -L "https://images.pexels.com/photos/6060193/pexels-photo-6060193.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/water_services-2.jpg"
sleep 1

# Download water_services-3.jpg
echo "Downloading water_services-3.jpg..."
curl -L "https://images.pexels.com/photos/31731604/pexels-photo-31731604.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/water_services-3.jpg"
sleep 1

# Download electricity_services-1.jpg
echo "Downloading electricity_services-1.jpg..."
curl -L "https://images.pexels.com/photos/5836185/pexels-photo-5836185.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/electricity_services-1.jpg"
sleep 1

# Download electricity_services-2.jpg
echo "Downloading electricity_services-2.jpg..."
curl -L "https://images.pexels.com/photos/371936/pexels-photo-371936.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/electricity_services-2.jpg"
sleep 1

# Download electricity_services-3.jpg
echo "Downloading electricity_services-3.jpg..."
curl -L "https://images.pexels.com/photos/4320481/pexels-photo-4320481.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/electricity_services-3.jpg"
sleep 1

# Download waste_management-1.jpg
echo "Downloading waste_management-1.jpg..."
curl -L "https://images.pexels.com/photos/29157139/pexels-photo-29157139.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/waste_management-1.jpg"
sleep 1

# Download waste_management-2.jpg
echo "Downloading waste_management-2.jpg..."
curl -L "https://images.pexels.com/photos/13682408/pexels-photo-13682408.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/waste_management-2.jpg"
sleep 1

# Download waste_management-3.jpg
echo "Downloading waste_management-3.jpg..."
curl -L "https://images.pexels.com/photos/11666823/pexels-photo-11666823.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/waste_management-3.jpg"
sleep 1

# Download road_maintenance-1.jpg
echo "Downloading road_maintenance-1.jpg..."
curl -L "https://images.pexels.com/photos/4254898/pexels-photo-4254898.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/road_maintenance-1.jpg"
sleep 1

# Download road_maintenance-2.jpg
echo "Downloading road_maintenance-2.jpg..."
curl -L "https://images.pexels.com/photos/2678104/pexels-photo-2678104.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/road_maintenance-2.jpg"
sleep 1

# Download road_maintenance-3.jpg
echo "Downloading road_maintenance-3.jpg..."
curl -L "https://images.pexels.com/photos/5640574/pexels-photo-5640574.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/road_maintenance-3.jpg"
sleep 1

# Download sa_cities-1.jpg
echo "Downloading sa_cities-1.jpg..."
curl -L "https://images.pexels.com/photos/10317039/pexels-photo-10317039.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/content/sa_cities-1.jpg"
sleep 1

# Download sa_cities-2.jpg
echo "Downloading sa_cities-2.jpg..."
curl -L "https://images.pexels.com/photos/7508609/pexels-photo-7508609.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/content/sa_cities-2.jpg"
sleep 1

# Download sa_cities-3.jpg
echo "Downloading sa_cities-3.jpg..."
curl -L "https://images.pexels.com/photos/4606404/pexels-photo-4606404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/content/sa_cities-3.jpg"
sleep 1

# Download sa_cities-4.jpg
echo "Downloading sa_cities-4.jpg..."
curl -L "https://images.pexels.com/photos/20033068/pexels-photo-20033068.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/content/sa_cities-4.jpg"
sleep 1

# Download sa_cities-5.jpg
echo "Downloading sa_cities-5.jpg..."
curl -L "https://images.pexels.com/photos/2960007/pexels-photo-2960007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/content/sa_cities-5.jpg"
sleep 1

# Download sa_cities-6.jpg
echo "Downloading sa_cities-6.jpg..."
curl -L "https://images.pexels.com/photos/2407127/pexels-photo-2407127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/content/sa_cities-6.jpg"
sleep 1

# Download sa_communities-1.jpg
echo "Downloading sa_communities-1.jpg..."
curl -L "https://images.pexels.com/photos/4708430/pexels-photo-4708430.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_communities-1.jpg"
sleep 1

# Download sa_communities-2.jpg
echo "Downloading sa_communities-2.jpg..."
curl -L "https://images.pexels.com/photos/6940622/pexels-photo-6940622.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_communities-2.jpg"
sleep 1

# Download sa_communities-3.jpg
echo "Downloading sa_communities-3.jpg..."
curl -L "https://images.pexels.com/photos/4353300/pexels-photo-4353300.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_communities-3.jpg"
sleep 1

# Download sa_communities-4.jpg
echo "Downloading sa_communities-4.jpg..."
curl -L "https://images.pexels.com/photos/32370145/pexels-photo-32370145.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_communities-4.jpg"
sleep 1

# Download sa_government-1.jpg
echo "Downloading sa_government-1.jpg..."
curl -L "https://images.pexels.com/photos/7841504/pexels-photo-7841504.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_government-1.jpg"
sleep 1

# Download sa_government-2.jpg
echo "Downloading sa_government-2.jpg..."
curl -L "https://images.pexels.com/photos/20123973/pexels-photo-20123973.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_government-2.jpg"
sleep 1

# Download sa_government-3.jpg
echo "Downloading sa_government-3.jpg..."
curl -L "https://images.pexels.com/photos/32358146/pexels-photo-32358146.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/sa_government-3.jpg"
sleep 1

# Download mobile_technology-1.jpg
echo "Downloading mobile_technology-1.jpg..."
curl -L "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/mobile_technology-1.jpg"
sleep 1

# Download mobile_technology-2.jpg
echo "Downloading mobile_technology-2.jpg..."
curl -L "https://images.pexels.com/photos/5081930/pexels-photo-5081930.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/mobile_technology-2.jpg"
sleep 1

# Download mobile_technology-3.jpg
echo "Downloading mobile_technology-3.jpg..."
curl -L "https://images.pexels.com/photos/4549408/pexels-photo-4549408.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/mobile_technology-3.jpg"
sleep 1

# Download mobile_technology-4.jpg
echo "Downloading mobile_technology-4.jpg..."
curl -L "https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/mobile_technology-4.jpg"
sleep 1

# Download mobile_technology-5.jpg
echo "Downloading mobile_technology-5.jpg..."
curl -L "https://images.pexels.com/photos/8217433/pexels-photo-8217433.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/mobile_technology-5.jpg"
sleep 1

# Download digital_payment-1.jpg
echo "Downloading digital_payment-1.jpg..."
curl -L "https://images.pexels.com/photos/11279906/pexels-photo-11279906.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_payment-1.jpg"
sleep 1

# Download digital_payment-2.jpg
echo "Downloading digital_payment-2.jpg..."
curl -L "https://images.pexels.com/photos/7621136/pexels-photo-7621136.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_payment-2.jpg"
sleep 1

# Download digital_payment-3.jpg
echo "Downloading digital_payment-3.jpg..."
curl -L "https://images.pexels.com/photos/6633599/pexels-photo-6633599.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_payment-3.jpg"
sleep 1

# Download digital_payment-4.jpg
echo "Downloading digital_payment-4.jpg..."
curl -L "https://images.pexels.com/photos/8938733/pexels-photo-8938733.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/digital_payment-4.jpg"
sleep 1

# Download cloud_technology-1.jpg
echo "Downloading cloud_technology-1.jpg..."
curl -L "https://images.pexels.com/photos/17323801/pexels-photo-17323801.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/cloud_technology-1.jpg"
sleep 1

# Download cloud_technology-2.jpg
echo "Downloading cloud_technology-2.jpg..."
curl -L "https://images.pexels.com/photos/17489156/pexels-photo-17489156.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/cloud_technology-2.jpg"
sleep 1

# Download cloud_technology-3.jpg
echo "Downloading cloud_technology-3.jpg..."
curl -L "https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/cloud_technology-3.jpg"
sleep 1

# Download iot_sensors-1.jpg
echo "Downloading iot_sensors-1.jpg..."
curl -L "https://images.pexels.com/photos/27662922/pexels-photo-27662922.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/iot_sensors-1.jpg"
sleep 1

# Download iot_sensors-2.jpg
echo "Downloading iot_sensors-2.jpg..."
curl -L "https://images.pexels.com/photos/27523128/pexels-photo-27523128.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/iot_sensors-2.jpg"
sleep 1

# Download iot_sensors-3.jpg
echo "Downloading iot_sensors-3.jpg..."
curl -L "https://images.pexels.com/photos/24503710/pexels-photo-24503710.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/iot_sensors-3.jpg"
sleep 1

# Download iot_sensors-4.jpg
echo "Downloading iot_sensors-4.jpg..."
curl -L "https://images.pexels.com/photos/18509543/pexels-photo-18509543.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/iot_sensors-4.jpg"
sleep 1

# Download government_workers-1.jpg
echo "Downloading government_workers-1.jpg..."
curl -L "https://images.pexels.com/photos/7103095/pexels-photo-7103095.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/government_workers-1.jpg"
sleep 1

# Download government_workers-2.jpg
echo "Downloading government_workers-2.jpg..."
curl -L "https://images.pexels.com/photos/7841795/pexels-photo-7841795.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/government_workers-2.jpg"
sleep 1

# Download government_workers-3.jpg
echo "Downloading government_workers-3.jpg..."
curl -L "https://images.pexels.com/photos/6950035/pexels-photo-6950035.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/government_workers-3.jpg"
sleep 1

# Download government_workers-4.jpg
echo "Downloading government_workers-4.jpg..."
curl -L "https://images.pexels.com/photos/7552374/pexels-photo-7552374.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/government_workers-4.jpg"
sleep 1

# Download citizens_services-1.jpg
echo "Downloading citizens_services-1.jpg..."
curl -L "https://images.pexels.com/photos/7103171/pexels-photo-7103171.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/citizens_services-1.jpg"
sleep 1

# Download citizens_services-2.jpg
echo "Downloading citizens_services-2.jpg..."
curl -L "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/citizens_services-2.jpg"
sleep 1

# Download citizens_services-3.jpg
echo "Downloading citizens_services-3.jpg..."
curl -L "https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/citizens_services-3.jpg"
sleep 1

# Download citizens_services-4.jpg
echo "Downloading citizens_services-4.jpg..."
curl -L "https://images.pexels.com/photos/6894013/pexels-photo-6894013.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/citizens_services-4.jpg"
sleep 1

# Download citizens_services-5.jpg
echo "Downloading citizens_services-5.jpg..."
curl -L "https://images.pexels.com/photos/4909462/pexels-photo-4909462.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/content/citizens_services-5.jpg"
sleep 1

# Download elderly_technology-1.jpg
echo "Downloading elderly_technology-1.jpg..."
curl -L "https://images.pexels.com/photos/3783270/pexels-photo-3783270.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/elderly_technology-1.jpg"
sleep 1

# Download elderly_technology-2.jpg
echo "Downloading elderly_technology-2.jpg..."
curl -L "https://images.pexels.com/photos/3782198/pexels-photo-3782198.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/elderly_technology-2.jpg"
sleep 1

# Download elderly_technology-3.jpg
echo "Downloading elderly_technology-3.jpg..."
curl -L "https://images.pexels.com/photos/5511641/pexels-photo-5511641.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/elderly_technology-3.jpg"
sleep 1

# Download youth_technology-1.jpg
echo "Downloading youth_technology-1.jpg..."
curl -L "https://images.pexels.com/photos/17511215/pexels-photo-17511215.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/youth_technology-1.jpg"
sleep 1

# Download youth_technology-2.jpg
echo "Downloading youth_technology-2.jpg..."
curl -L "https://images.pexels.com/photos/5119831/pexels-photo-5119831.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/youth_technology-2.jpg"
sleep 1

# Download youth_technology-3.jpg
echo "Downloading youth_technology-3.jpg..."
curl -L "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/youth_technology-3.jpg"
sleep 1

# Download youth_technology-4.jpg
echo "Downloading youth_technology-4.jpg..."
curl -L "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&h=350" -o "public/images/blog/technology/youth_technology-4.jpg"
sleep 1

# Download category_municipal_services-1.jpg
echo "Downloading category_municipal_services-1.jpg..."
curl -L "https://images.pexels.com/photos/7785095/pexels-photo-7785095.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_municipal_services-1.jpg"
sleep 1

# Download category_municipal_services-2.jpg
echo "Downloading category_municipal_services-2.jpg..."
curl -L "https://images.pexels.com/photos/14591006/pexels-photo-14591006.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_municipal_services-2.jpg"
sleep 1

# Download category_government_guides-1.jpg
echo "Downloading category_government_guides-1.jpg..."
curl -L "https://images.pexels.com/photos/30917904/pexels-photo-30917904.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_government_guides-1.jpg"
sleep 1

# Download category_government_guides-2.jpg
echo "Downloading category_government_guides-2.jpg..."
curl -L "https://images.pexels.com/photos/5428700/pexels-photo-5428700.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_government_guides-2.jpg"
sleep 1

# Download category_community_stories-1.jpg
echo "Downloading category_community_stories-1.jpg..."
curl -L "https://images.pexels.com/photos/32426242/pexels-photo-32426242.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_community_stories-1.jpg"
sleep 1

# Download category_community_stories-2.jpg
echo "Downloading category_community_stories-2.jpg..."
curl -L "https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_community_stories-2.jpg"
sleep 1

# Download category_news_updates-1.jpg
echo "Downloading category_news_updates-1.jpg..."
curl -L "https://images.pexels.com/photos/30855420/pexels-photo-30855420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_news_updates-1.jpg"
sleep 1

# Download category_news_updates-2.jpg
echo "Downloading category_news_updates-2.jpg..."
curl -L "https://images.pexels.com/photos/10787852/pexels-photo-10787852.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" -o "public/images/blog/categories/category_news_updates-2.jpg"
sleep 1

echo "✅ All images downloaded successfully!"
echo "📊 Images saved to public/images/blog/"
echo "🚀 Ready for blog integration!"
