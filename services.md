---
layout: default
title: Услуги
description:
image:
nav-menu: true
permalink: /services
---

<section id="banner" class="style2">

    <div class="inner">
        <span class="image">
            <img src="{% for slide in site.data.services.slides %}{{ slide.image | relative_url }}{% endfor %}" alt="">
        </span>
        <header class="major">

            <h1>Услуги</h1>

        </header>
    </div>

</section>

<section>
<ul class="nav nav-tabs">
  <li class="active 2u 4u(small)"><a href="#organization" data-toggle="pill">Организация</a></li>
  <li class="2u 4u(small)"><a href="#media" data-toggle="pill">Медиа</a></li>
  <li class="2u 4u(small)"><a href="#it-tech" data-toggle="pill">IT-технологии</a></li>
  <li class="2u 4u(small)"><a href="#prodaction" data-toggle="pill">Производство</a></li>
  <li class="2u 4u(small)"><a href="#typography" data-toggle="pill">Типография</a></li>
  <li class="2u 4u(small)"><a href="#advertising" data-toggle="pill">Реклама</a></li>
  <li class="2u 4u(small)"><a href="#producing" data-toggle="pill">Продюсерство</a></li>
  <li class="2u 4u(small)"><a href="#inf-help" data-toggle="pill">Инф. поддержка</a></li>
  <li class="2u 4u(small)"><a href="#volunteering" data-toggle="pill">Волонтерство</a></li>
  <li class="2u 4u(small)"><a href="#promotion" data-toggle="pill">СМИ</a></li>
  <li class="2u 4u(small)"><a href="#analytic" data-toggle="pill">Аналитика</a></li>
  <li class="2u 4u(small)"><a href="#design" data-toggle="pill">Дизайн</a></li>
</ul>
</section>

<section class="service">
  {% for slide in site.data.services.slides %}
	<section>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>{{ slide.title }}</h3>
				</header>
				<p>{{ slide.body }}</p>
			</div>
		</div>
	</section>
  {% endfor %}
</section>
